(function () {
  const currentScript = document.currentScript;
  const src = currentScript.getAttribute('src');
  const basePath = src.replace('assets/js/footer.js', '');

  const footerHTML = `
  <!-- footer section started -->
  <footer id="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <img loading="lazy" src="${basePath}assets/images/casa-concreto-footer-logo.png" class="footer-logo" alt="logo">
        <p class="footer-address">
          <a class="dynamic-email"></a><br>
          <a class="dynamic-phone"></a>
        </p>
        <div class="footer-social">
          <a class="dynamic-facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a class="dynamic-instagram"><i class="fa-brands fa-instagram"></i></a>
          <a class="dynamic-youtube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="${basePath}index.html">Home</a></li>
          <li><a href='${basePath}pages/about.html'>About</a></li>
          <li><a href='${basePath}pages/discover/gallery.html'>Gallery</a></li>
          <li><a href='${basePath}pages/contactus.html'>Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href='${basePath}pages/Experience.html'>Experience</a></li>
          <li><a href='${basePath}pages/discover/Amenities.html'>Amenities</a></li>
          <li><a href='${basePath}pages/discover/blog.html'>Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Find Us</h4>
        <iframe class="dynamic-map" frameborder="0" allowfullscreen>
        </iframe>
      </div>
    </div>
    <div class="footer-brand">CASA CONCRETO</div>
  </footer>
  <!-- footer section ended -->

  <!-- Floating Contact Icons -->
  <div class="floating-contact-icons">
  
  <a class="floating-icon floating-whatsapp dynamic-whatsapp" 
     target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Us">
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <a class="floating-icon floating-call dynamic-phone" 
     aria-label="Call Us">
    <i class="fa-solid fa-phone"></i>
  </a>

</div>
  `;

  currentScript.insertAdjacentHTML('beforebegin', footerHTML);
})();
