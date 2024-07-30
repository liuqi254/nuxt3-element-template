export default defineNitroPlugin(nitroApp => {
    // 首次加载app loading
    nitroApp.hooks.hook('render:html', html => {
        html.head.push(
            `<style>.loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                background-color: #fff;
               
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid #409EFF;
                border-top-color: #fff;
                border-radius: 50%;
                animation: spin 2s linear infinite;
            }
            
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
            
           .hiden {
                display: none;
            }
            
            </style>`,
        );
        html.bodyPrepend.push('<div class="loading-overlay"><div class="loading-spinner"></div></div>');
        html.bodyPrepend.push(
            '<script>setTimeout(() => { document.querySelector(".loading-overlay").classList.add("hiden"); }, 1000);</script>',
        );
    });
});
