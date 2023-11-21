// Navbar.js


const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Add your brand here</a>
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#" data-uri="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/game">Game</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/new">New Page</a>
            </li>
            <li class="nav-item">
            </li>                        
          </ul>
        </div>
      </div>
    </nav>
  `;

  navbarWrapper.innerHTML = navbar;
  

};

export default Navbar;
