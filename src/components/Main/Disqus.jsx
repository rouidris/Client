import React, { useEffect } from 'react';

function Disqus() {
    useEffect(() => {
        // JavaScript-код Disqus
        var disqus_config = function () {
            this.page.url = 'http://spaLab';
            this.page.identifier = '65165165';
        };

        (function () {
            var d = document,
                s = d.createElement('script');
            s.src = 'https://http-localhost-3000-posts.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();

        // Очистка Disqus при размонтировании компонента (по желанию)
        return () => {
            var disqusThread = document.getElementById('disqus_thread');
            disqusThread.innerHTML = ''; // Очистка содержимого Disqus при размонтировании компонента
        };


    }, []);

    return (
        <div>
            {/* Разметка для отображения комментариев Disqus */}
            <div id="disqus_thread" ></div>
            <noscript>
                Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
            </noscript>
        </div>
    );
}
export default Disqus;
