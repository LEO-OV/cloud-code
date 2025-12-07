/* main.js */
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const themeToggle = document.getElementById("themeToggle");
  const navList = document.querySelector(".nav__list");
  const body = document.documentElement;
  const contactForm = document.getElementById("contactForm");
  const backTop = document.getElementById("backTop");
  const yearEl = document.getElementById("year");
  const overlay = document.getElementById("overlay");
  const menuToggle = document.getElementById("menuToggle");
  const navBar = document.getElementById("navbar");

  let menuState = false;

  // --- MOBILE MENU ---
  menuToggle.addEventListener("click", () => {
    menuState ? closeMenu() : openMenu();
  });

  // Cerrar menú al dar clic en cualquier link del menú
  document
    .querySelectorAll(".nav__link, .navbar__nav--item a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (menuState) closeMenu();
      });
    });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- ABRIR MENÚ ---
  function openMenu() {
    menuState = true;
    menuToggle.setAttribute("aria-expanded", "true");
    navList.classList.add("is-open");
    overlay.classList.add("active");
    menuToggle.classList.add("active");
  }

  // --- CERRAR MENÚ ---
  function closeMenu() {
    menuState = false;
    menuToggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("is-open");
    overlay.classList.remove("active");
    menuToggle.classList.remove("active");
  }

  // --- CERRAR MENÚ AL SUPERAR 900px ---
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && menuState) {
      closeMenu();
    }
  });

  // Init year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- THEME ---
  const THEME_KEY = "cloudcode_theme";
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) body.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const current =
      body.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    body.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    themeToggle.setAttribute("aria-pressed", next === "light");
  });

  // --- CONTACT FORM (fake submit) ---
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedback = document.getElementById("formFeedback");
      feedback.textContent =
        lang === "es" ? "Enviando mensaje..." : "Sending message...";
      feedback.style.color = "var(--muted)";
      // Simulate async send
      setTimeout(() => {
        feedback.textContent =
          lang === "es"
            ? "¡Gracias! Te contactamos pronto."
            : "Thanks! We will contact you soon.";
        feedback.style.color = "var(--accent)";
        contactForm.reset();
      }, 900);
    });
  }

  // CONTACT CTA (schedule) - simple behavior
  const contactCTA = document.getElementById("contactCTA");
  if (contactCTA) {
    contactCTA.addEventListener("click", () => {
      window.open("https://calendly.com/", "_blank"); // placeholder
    });
  }

  // --- BACK TO TOP ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backTop.classList.add("is-visible");
    else backTop.classList.remove("is-visible");
  });
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // Keyboard: ESC closes mobile nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") navList.classList.remove("is-open");
  });
});

// --- OPTIMIZED FIBONACCI PARTICLE SPHERE ---
const canvas = document.getElementById("heroCanvas");

if (canvas && typeof THREE !== "undefined") {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    70,
    canvas.offsetWidth / canvas.offsetHeight,
    0.01,
    100
  );
  camera.position.z = 3.5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // -------- 1. TEXTURA LIGERA (Círculo generado en código) --------
  const createCircleTexture = () => {
    const size = 64; // Pequeño para rendimiento
    const matCanvas = document.createElement("canvas");
    matCanvas.width = size;
    matCanvas.height = size;
    const ctx = matCanvas.getContext("2d");

    // Dibujamos un círculo blanco difuminado
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2.2, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    return new THREE.CanvasTexture(matCanvas);
  };

  // -------- 2. GEOMETRÍA DE FIBONACCI (Matemática Pura) --------
  const particleCount = 800; // Cantidad de bolitas
  const sphereRadius = 2;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  // Algoritmo de Fibonacci para distribución esférica uniforme
  const phi = Math.PI * (3 - Math.sqrt(5)); // Ángulo dorado

  for (let i = 0; i < particleCount; i++) {
    const y = 1 - (i / (particleCount - 1)) * 2; // y va de 1 a -1
    const radiusAtY = Math.sqrt(1 - y * y); // radio en la altura y
    const theta = phi * i; // incremento del ángulo dorado

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Escalamos por el radio deseado de la esfera
    positions[i * 3] = x * sphereRadius;
    positions[i * 3 + 1] = y * sphereRadius;
    positions[i * 3 + 2] = z * sphereRadius;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // -------- 3. MATERIAL OPTIMIZADO --------
  const material = new THREE.PointsMaterial({
    color: 0x007aff,
    size: 0.05, // Tamaño de la bolita
    map: createCircleTexture(),
    transparent: true,
    opacity: 1,
    sizeAttenuation: true, // Se hacen pequeñas a lo lejos (efecto 3D)
    alphaTest: 0.5, // OPTIMIZACIÓN CRÍTICA: Evita cálculos de transparencia innecesarios
    depthWrite: false,
  });

  const sphere = new THREE.Points(geometry, material);
  scene.add(sphere);

  // -------- 4. ANIMACIÓN SIMPLE --------
  function animate() {
    requestAnimationFrame(animate);

    // Rotación suave en dos ejes para que se vea más orgánico
    sphere.rotation.y += 0.0015;
    sphere.rotation.x += 0.0005;

    renderer.render(scene, camera);
  }

  animate();

  // Función de redimensionamiento inteligente
  const onWindowResize = () => {
    const width = canvas.parentElement.offsetWidth;
    const height = canvas.parentElement.offsetHeight;

    // 1. Evitar deformación (Aspect Ratio)
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // 2. Mantener nitidez
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener("resize", onWindowResize);

  // Llamamos a la función una vez al inicio para asegurar que arranque bien
  onWindowResize();
}
