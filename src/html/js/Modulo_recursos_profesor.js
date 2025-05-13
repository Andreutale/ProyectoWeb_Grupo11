// Selección/deselección de todos los checkboxes
function setupSelectAllCheckbox() {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;

    // Función para actualizar la apariencia del checkbox
    const updateCheckboxAppearance = (checkbox, isChecked) => {
        const img = checkbox.nextElementSibling;
        if (isChecked) {
            checkbox.style.backgroundColor = 'var(--azul-claro)';
            checkbox.style.borderColor = 'var(--azul-oscuro)';
            img.style.opacity = '1';
        } else {
            checkbox.style.backgroundColor = 'white';
            checkbox.style.borderColor = 'var(--azul-claro)';
            img.style.opacity = '0';
        }
    };

    // Evento para el checkbox "Seleccionar todos"
    selectAll.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.rowCheckbox');
        const isChecked = this.checked;

        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            updateCheckboxAppearance(checkbox, isChecked);
        });
    });

    // Eventos para los checkboxes individuales
    document.querySelectorAll('.rowCheckbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCheckboxAppearance(this, this.checked);

            // Actualizar el estado de "Seleccionar todos"
            const allCheckboxes = document.querySelectorAll('.rowCheckbox');
            const allChecked = [...allCheckboxes].every(cb => cb.checked);
            selectAll.checked = allChecked;
            updateCheckboxAppearance(selectAll, allChecked);
        });
    });
}

// Ordenación de columnas
function setupColumnSorting() {
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            const th = this.closest('th');
            const table = document.getElementById('tablaRecursos');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const columnIndex = th.cellIndex;
            const sortKey = th.getAttribute('data-sort');
            const isAscending = !th.classList.contains('asc');

            // Ordenar filas
            rows.sort((rowA, rowB) => {
                const cellA = rowA.cells[columnIndex];
                const cellB = rowB.cells[columnIndex];
                let valueA, valueB;

                if (sortKey === 'fecha') {
                    valueA = cellA.querySelector('h3').getAttribute('data-date');
                    valueB = cellB.querySelector('h3').getAttribute('data-date');
                } else {
                    valueA = cellA.textContent.trim().toLowerCase();
                    valueB = cellB.textContent.trim().toLowerCase();
                }

                return isAscending
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            });

            // Reinsertar filas ordenadas
            rows.forEach(row => tbody.appendChild(row));

            // Actualizar indicadores visuales
            document.querySelectorAll('[data-sort]').forEach(header => {
                header.classList.remove('asc', 'desc');
            });
            th.classList.add(isAscending ? 'asc' : 'desc');
        });
    });
}

// Menús desplegables de opciones
function setupDropdownMenus() {
    document.querySelectorAll('.opciones').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.closest('.dropdown-container').querySelector('.dropdown-menu');
            const isVisible = dropdown.style.display === 'block';

            // Cerrar otros dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) menu.style.display = 'none';
            });

            // Alternar visibilidad del actual
            dropdown.style.display = isVisible ? 'none' : 'block';
        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
}

// Modal para añadir recurso
function setupResourceModal() {
    const modal = document.getElementById('modalAñadirRecurso');
    if (!modal) return;

    const btnOpen = document.getElementById('btnAñadirRecurso');
    const btnClose = document.querySelector('.close-modal');
    const form = document.getElementById('formAñadirRecurso');

    btnOpen.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para guardar el recurso
        console.log('Recurso añadido:', {
            nombre: this.nombreRecurso.value,
            tipo: this.tipoRecurso.value,
            archivo: this.archivoRecurso.files[0]?.name
        });
        this.reset();
        modal.style.display = 'none';
    });
}

// Cargar header y footer
async function loadHeaderAndFooter() {
    try {
        // Cargar header
        const headerResponse = await fetch("Modulo_header_asignaturas.html");
        if (headerResponse.ok) {
            document.getElementById("header").innerHTML = await headerResponse.text();
            // Iniciar menú hamburguesa si está disponible
            if (typeof iniciarMenuHamburguesa === 'function') {
                iniciarMenuHamburguesa();
            }
        }

        // Cargar footer
        const footerResponse = await fetch("Modulo_footer.html");
        if (footerResponse.ok) {
            document.getElementById("footer").innerHTML = await footerResponse.text();
        }
    } catch (error) {
        console.error('Error cargando header/footer:', error);
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setupSelectAllCheckbox();
    setupColumnSorting();
    setupDropdownMenus();
    setupResourceModal();
    loadHeaderAndFooter();
});