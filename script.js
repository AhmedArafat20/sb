// ================= SCRIPT.JS - سباك بالطائف =================

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1) تغيير شكل الهيدر عند التمرير ---------- */
  const header = document.getElementById("header");

  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  /* ---------- 2) قائمة الجوال (Hamburger Menu) ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const navbar = document.getElementById("navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    // إغلاق القائمة عند الضغط على أي رابط داخلها
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener("click", (e) => {
      const isClickInside =
        navbar.contains(e.target) || menuBtn.contains(e.target);
      if (!isClickInside) {
        navbar.classList.remove("active");
        menuBtn.classList.remove("active");
      }
    });
  }

  /* ---------- 3) تفعيل عناصر "reveal" عند ظهورها بالتمرير ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------- 4) تفعيل الرابط النشط في القائمة حسب القسم الظاهر ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  function setActiveLink() {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active-link");
      }
    });
  }
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* ---------- 5) فورم الواتساب ---------- */
  const whatsappForm = document.getElementById("whatsappForm");
  const WHATSAPP_NUMBER = "966502123049"; // بدون + وبدون صفر في البداية

  if (whatsappForm) {
    whatsappForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("waName").value.trim();
      const phone = document.getElementById("waPhone").value.trim();
      const area = document.getElementById("waArea").value.trim();
      const message = document.getElementById("waMessage").value.trim();

      if (!name || !phone || !message) {
        alert("من فضلك عبّي الاسم ورقم الجوال وتفاصيل المشكلة.");
        return;
      }

      let text = `مرحبًا سباك بالطائف 👋%0A`;
      text += `الاسم: ${name}%0A`;
      text += `رقم الجوال: ${phone}%0A`;
      if (area) text += `الحي/المنطقة: ${area}%0A`;
      text += `تفاصيل المشكلة: ${message}`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        text.replace(/%0A/g, "\n")
      )}`;

      window.open(whatsappUrl, "_blank");
      whatsappForm.reset();
    });
  }

  /* ---------- 6) السنة الحالية في الفوتر ---------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
