import { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/custom/theme-provider';
import './globals.css';



export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content',  '${LIGHT_THEME_COLOR}' );
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

//Change to auto detect theme
//meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
          //attribute="class"
          //defaultTheme="system"
          //enableSystem
          //disableTransitionOnChange

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="light"
      lang="en"
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider

          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange

        >
          <Toaster position="top-center" />
          {children}

  <div class="mt-4 flex items-right justify-end gap-2 md:mt-8 ">


                <df-messenger
                  location="europe-west2"
                  project-id="keen-vision-437710-j9"
                  agent-id="498af930-2267-47c5-a7c7-a97b68d1828a"
                  language-code="en"
                  max-query-length="-1">
                  <df-messenger-chat-bubble
                   chat-title="Small talk">
                  </df-messenger-chat-bubble>
                </df-messenger>

</div>

        </ThemeProvider>

        <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>



      </body>
    </html>
  );
}
