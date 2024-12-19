import React, { useState, useEffect } from 'react';
import { MenuList, MenuListItem, Separator, styleReset, Button } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import win95Logo from "./assets/images/win95.png";

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const bgImage = require('./assets/images/windows95bglogo.png');

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
  body {
    margin: 0;
    background: url(${bgImage}) no-repeat center center fixed;
    background-size: cover;
  }
`;

const App = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setTime(`${hours}:${minutes}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <GlobalStyles />
            <ThemeProvider theme={original}>
                <div className="fixed bottom-0 !w-[100vw]">
                    {/* Left side menu */}
                    <MenuList className="flex items-center gap-2" inline>
                        <MenuListItem square>
                            <img
                                src={win95Logo}
                                alt="Start Icon"
                                className="h-6 mr-2"
                            />
                        </MenuListItem>
                        <Button>Roadmap</Button>
                        <Button className='ml-6'>About</Button>
                        <Button className='ml-6 mr-6'>Contact</Button>
                        <Button className="font-ms-sans-serif text-sm">
                            {time}
                        </Button>
                    </MenuList>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default App;
