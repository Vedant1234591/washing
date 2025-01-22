document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const sidebar = document.getElementById("sidebar");
    const buttonClose = document.getElementById("button-close");
  
    const toggleNavLinks = () => {
        navLinks.classList.toggle("hidden"); 
    };
  
    const toggleSidebar = () => {
        sidebar.classList.toggle("hidden"); 
    };
  
  
    menuToggle.addEventListener("click", function () {
        toggleSidebar();  
      
        navLinks.classList.add("hidden");
    });
  
    
    buttonClose.addEventListener("click", function () {
        sidebar.classList.add("hidden"); 
    });
  
    
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            sidebar.classList.add("hidden"); 
           
        }
    });
  });
  document.querySelectorAll('.btn-close').forEach(function(button) {
    button.addEventListener('click', function() {
      const alert = this.closest('.alert');
      alert.classList.add('d-none');
    });
  });
  
function autoDismissAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
      setTimeout(function() {
    
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }, 2000); 
    }
  }
  

  if (document.getElementById('success-alert')) {
    autoDismissAlert('success-alert');
  }
  
  if (document.getElementById('error-alert')) {
    autoDismissAlert('error-alert');
  }
  document.getElementById("toggle-sidebar").addEventListener("click", function() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("open");
  });
  // On page load, ensure sidebar is hidden
document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("open");  // Ensure it's hidden initially
});

// Toggle sidebar visibility on button click
document.getElementById("toggle-sidebar").addEventListener("click", function() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("open");  // Toggle visibility
});
// Get the sidebar and buttons
const sidebar = document.getElementById("sidebar");
const toggleButton = document.getElementById("toggle-sidebar");
const closeButton = document.getElementById("button-close");

// Ensure the sidebar is hidden when the page loads (no need to use localStorage)
document.addEventListener("DOMContentLoaded", function() {
  // Ensure the sidebar is hidden by default when the page loads
  sidebar.classList.remove("open");
});

// Toggle sidebar visibility on button click
toggleButton.addEventListener("click", function() {
  sidebar.classList.toggle("open");  // Toggle the 'open' class to show/hide the sidebar
});

// Close the sidebar when the close button inside the sidebar is clicked
closeButton.addEventListener("click", function() {
  sidebar.classList.remove("open");  // Remove the 'open' class to hide the sidebar
});
document.addEventListener("DOMContentLoaded", function() {
  sidebar.classList.remove("open"); // Sidebar starts off-screen (hidden)
});