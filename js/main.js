        // Helper para obter o valor de uma variável CSS
        function getCssVariable(variableName) {
            return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
        }

        // Use DOMContentLoaded to ensure the canvas element exists before trying to get its context
        document.addEventListener('DOMContentLoaded', function() {
            // Chart.js - Gráfico de distribuição de planos (seu gráfico de pizza/rosquinha)
            const ctx = document.getElementById('plansChart');
            if (ctx) { // Check if the canvas element exists
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Free', 'Econômico', 'Tipo', 'Penthouse'],
                        datasets: [{
                            data: [40, 30, 20, 10],
                            backgroundColor: [
                                '#10b981', // Verde
                                '#3b82f6', // Azul
                                '#8b5cf6', // Violeta
                                '#ec4899'  // Rosa
                            ],
                            borderWidth: 0,
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%',
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.label}: ${context.parsed}% dos usuários`;
                                    }
                                }
                            }
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        }
                    }
                });
            }

            // NOVO GRÁFICO: Chart.js - Gráfico de Áreas do Ecossistema (Gráfico de Barras Horizontal)
            const ecosystemCtx = document.getElementById('flowChart');
            if (ecosystemCtx) {
                new Chart(ecosystemCtx, {
                    type: 'bar', // Tipo de gráfico de barras
                    data: {
                        labels: ['Gestão', 'Automação', 'Dados', 'Educação'],
                        datasets: [{
                            label: 'Foco do Ecossistema Foton', // Título do dataset
                            data: [.8, .1, .4, .1], // Valores arbitrários, apenas para ter barras de mesmo tamanho
                            backgroundColor: [
                                getCssVariable('--primary'),
                                getCssVariable('--primary'),
                                getCssVariable('--primary'),
                                getCssVariable('--primary')
                            ],
                            borderColor: [
                                getCssVariable('--primary-dark'),
                                getCssVariable('--primary-dark'),
                                getCssVariable('--primary-dark'),
                                getCssVariable('--primary-dark')
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y', // Faz com que as barras sejam horizontais
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false // Não precisamos de uma legenda para este gráfico simples
                            },
                            tooltip: {
                                callbacks: {
                                    title: function() { return ''; }, // Remove o título do tooltip
                                    label: function(context) {
                                        // Retorna o label do eixo Y e o valor da barra no eixo X
                                        return `${context.parsed.x*100}%`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                display: false // Oculta o eixo X, pois os valores são genéricos
                            },
                            y: {
                                grid: {
                                    display: true // Oculta as linhas de grade do eixo Y para um visual mais limpo
                                }
                            }
                        }
                    }
                });
            }
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    