import React from "react";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg shadow">
      <div class="container-fluid">
        <a
          class="navbar-brand"
          className="fw-bold fs-5 text-decoration-none text-white bg-dark px-4 py-2"
          style={{ borderRadius: "13px" }}
          href="/"
        >
          CroppoImage
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/cropimage">
                Crop Image
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/bgremove">
                Remove Background
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
