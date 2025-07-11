 // ========================================
        // GESTIÓN DEL TEMA Y PERSONALIZACIÓN
        // ========================================
        
        /**
         * Cambia el tema entre claro y oscuro
         * Esta función demuestra cómo las variables CSS permiten cambios instantáneos
         */
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-bs-theme', newTheme);
            document.getElementById('themeSelector').value = newTheme;
            
            // Guardar preferencia
            localStorage.setItem('dashboard-theme', newTheme);
            
            console.log(`Tema cambiado a: ${newTheme}`);
        }
        
        /**
         * Cambia el color principal del dashboard
         * Demuestra la potencia de las variables CSS para personalización en tiempo real
         */
        function changeThemeColor(color, rgb) {
            const root = document.documentElement;
            
            // Cambiar la variable CSS principal
            root.style.setProperty('--bs-primary', color);
            root.style.setProperty('--bs-primary-rgb', rgb);
            
            // Guardar preferencia
            localStorage.setItem('dashboard-primary-color', color);
            localStorage.setItem('dashboard-primary-rgb', rgb);
            
            // Feedback visual
            console.log(`Color principal cambiado a: ${color}`);
            
            // Mostrar notificación temporal
            showNotification('Color del tema actualizado correctamente', 'success');
        }
        
        /**
         * Toggle del sidebar en dispositivos móviles
         */
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
        }
        
        /**
         * Muestra notificaciones temporales
         */
        function showNotification(message, type = 'info') {
            // Crear elemento de notificación
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
            notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 350px;';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remover después de 3 segundos
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        }
        
        // ========================================
        // INICIALIZACIÓN Y EVENT LISTENERS
        // ========================================
        
        document.addEventListener('DOMContentLoaded', function() {
            // Cargar tema guardado
            const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
            document.getElementById('themeSelector').value = savedTheme;
            
            // Cargar color guardado
            const savedColor = localStorage.getItem('dashboard-primary-color');
            const savedRgb = localStorage.getItem('dashboard-primary-rgb');
            if (savedColor && savedRgb) {
                document.documentElement.style.setProperty('--bs-primary', savedColor);
                document.documentElement.style.setProperty('--bs-primary-rgb', savedRgb);
            }
            
            // Event listener para el selector de tema
            document.getElementById('themeSelector').addEventListener('change', function() {
                const selectedTheme = this.value;
                document.documentElement.setAttribute('data-bs-theme', selectedTheme);
                localStorage.setItem('dashboard-theme', selectedTheme);
                showNotification(`Tema cambiado a: ${selectedTheme}`, 'info');
            });
            
            // Cerrar sidebar en móvil al hacer clic fuera
            document.addEventListener('click', function(e) {
                const sidebar = document.getElementById('sidebar');
                const isClickInsideSidebar = sidebar.contains(e.target);
                const isToggleButton = e.target.closest('[onclick="toggleSidebar()"]');
                
                if (!isClickInsideSidebar && !isToggleButton && window.innerWidth <= 991) {
                    sidebar.classList.remove('show');
                }
            });
            
            // Navegación del sidebar
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remover clase active de todos los links
                    document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => {
                        l.classList.remove('active');
                    });
                    
                    // Agregar clase active al link clickeado
                    this.classList.add('active');
                    
                    // Cerrar sidebar en móvil
                    if (window.innerWidth <= 991) {
                        document.getElementById('sidebar').classList.remove('show');
                    }
                    
                    // Simular navegación
                    const section = this.textContent.trim();
                    showNotification(`Navegando a: ${section}`, 'info');
                });
            });
            
            // Animación staggered para las cards
            const cards = document.querySelectorAll('.fade-in-up');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
            
            console.log('🎯 Dashboard Bootstrap 5.3+ inicializado correctamente');
            console.log('🎨 Variables CSS personalizadas cargadas');
            console.log('📱 Funcionalidad responsive activada');
        });
        
        // ========================================
        // UTILIDADES DE DEBUGGING
        // ========================================
        
        // Función para mostrar todas las variables CSS activas
        function debugCSSVariables() {
            const computedStyles = getComputedStyle(document.documentElement);
            const variables = {};
            
            // Buscar todas las variables que empiecen con --bs o --dashboard
            for (let i = 0; i < computedStyles.length; i++) {
                const property = computedStyles[i];
                if (property.startsWith('--bs') || property.startsWith('--dashboard')) {
                    variables[property] = computedStyles.getPropertyValue(property);
                }
            }
            
            console.table(variables);
            return variables;
        }
        
        // Hacer disponible globalmente para debugging
        window.debugCSSVariables = debugCSSVariables;
        window.changeThemeColor = changeThemeColor;
        window.toggleSidebar = toggleSidebar;