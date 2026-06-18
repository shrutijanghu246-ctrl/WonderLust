(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

const searchInput = document.querySelector(".search-input");

if (searchInput) {
  const searchForm = document.querySelector("form[role='search']");
  // create dropdown div
  const dropdown = document.createElement("div");
  dropdown.style.cssText =
    "position:absolute; background:white; border:1px solid #ddd; border-radius:8px; width:300px; z-index:1000; box-shadow: 0 2px 8px rgba(0,0,0,0.15);";
  dropdown.style.display = "none";
  searchInput.parentElement.style.position = "relative";
  searchInput.parentElement.appendChild(dropdown);

  searchInput.addEventListener("input", async () => {
    const q = searchInput.value.trim();
    if (q.length < 2) {
      dropdown.style.display = "none";
      return;
    }
    const res = await fetch(`/listings/search?q=${q}`);
    const countries = await res.json();

    if (countries.length === 0) {
      dropdown.style.display = "none";
      return;
    }

    dropdown.innerHTML = countries
      .map(
        (country) =>
          `<div class="suggestion" style="padding:0.5rem 1rem; cursor:pointer;">${country}</div>`,
      )
      .join("");
    dropdown.style.display = "block";

    // on click suggestion
    dropdown.querySelectorAll(".suggestion").forEach((item) => {
      item.addEventListener("click", () => {
        searchInput.value = item.textContent;
        dropdown.style.display = "none";
        window.location.href = `/listings?country=${item.textContent}`;
      });
      item.addEventListener(
        "mouseover",
        () => (item.style.background = "#f5f5f5"),
      );
      item.addEventListener(
        "mouseout",
        () => (item.style.background = "white"),
      );
    });
  });

  // on form submit
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) window.location.href = `/listings?country=${q}`;
  });

  // hide dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) dropdown.style.display = "none";
  });
}
