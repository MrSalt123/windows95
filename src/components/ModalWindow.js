/***************************************************************************
 *                           MODAL COMPONENT
 * Reusable modal window that can show different content, menu bars, and 
 * status bars. Supports dragging, resizing, stacking with offset, and 
 * custom styling.

 **** BELOW YOU WILL FIND COMMENT BLOCKS EXPLAINING KEY PARTS OF THE LOGIC
 ***************************************************************************/
 import React, { useState, useEffect, useRef } from "react";

 const ModalWindow = ({
   title,
   content,
   isOpen,
   isVisible,
   onClose,
   onMinimize,
   onMaximizeToggle,
   onMouseDown,
   customStyles = {},
   zIndex = 1000, // Default zIndex
   isMobile,
   showMenuBar = true,
   showStatusBar = true,
   customMenuBar,
   customStatusBar,
   customTitleBar,
   stackIndex = 0, // For stacking offset
 }) => {
   /***************************************************************************
    * 1) INITIAL DIMENSIONS
    * We pick a default width/height for desktop (800x500) or mobile (200x200).
    * "isMaximized" tracks if the user clicked the "maximize" button.
    ***************************************************************************/
   const [modalWidth, setModalWidth] = useState(isMobile ? 200 : 800);
   const [modalHeight, setModalHeight] = useState(isMobile ? 200 : 500);
   const [isMaximized, setIsMaximized] = useState(false);
   const modalRef = useRef(null);
 
   /***************************************************************************
    * 2) STACK OFFSET CALCULATION
    * If multiple modals open, each new one is offset from the previous.
    * We clamp these offsets so the window won't appear entirely off-screen.
    ***************************************************************************/
   const OFFSET_STEP = 20;
   const calculateOffset = () => {
     if (isMaximized) {
       return { topOffset: 0, leftOffset: 0 };
     }
     const topOffset = stackIndex * OFFSET_STEP;
     const leftOffset = stackIndex * OFFSET_STEP;
 
     // Prevent offsets from pushing the modal beyond screen edges
     const maxTopOffset = window.innerHeight - modalHeight - 40;
     const maxLeftOffset = window.innerWidth - modalWidth - 40;
 
     return {
       topOffset: Math.min(topOffset, maxTopOffset),
       leftOffset: Math.min(leftOffset, maxLeftOffset),
     };
   };
   const { topOffset, leftOffset } = calculateOffset();
 
   /***************************************************************************
    * 3) ESC KEY TO CLOSE
    ***************************************************************************/
   useEffect(() => {
     if (!isOpen) return;
     const handleKeyDown = (e) => {
       if (e.key === "Escape") onClose();
     };
     document.addEventListener("keydown", handleKeyDown);
     return () => document.removeEventListener("keydown", handleKeyDown);
   }, [isOpen, onClose]);
 
   /***************************************************************************
    * 4) WHEN MODAL BECOMES INVISIBLE, RESET STATE
    ***************************************************************************/
   useEffect(() => {
     if (!isVisible) {
       // Restore the default (desktop=800 / mobile=200), matching our main style logic
       setModalWidth(isMobile ? 200 : 800);
       setModalHeight(isMobile ? 200 : 500);
       setIsMaximized(false);
     }
   }, [isVisible, isMobile]);
 
   /***************************************************************************
    * 5) RESIZING LOGIC
    ***************************************************************************/
   const startResizing = (e) => {
     if (isMaximized) return; // cannot resize if maximized
     e.stopPropagation();
     e.preventDefault();
 
     const isTouchEvent = e.type === "touchstart";
     const startX = isTouchEvent ? e.touches[0].clientX : e.clientX;
     const startY = isTouchEvent ? e.touches[0].clientY : e.clientY;
     const startW = modalWidth;
     const startH = modalHeight;
 
     const doResize = (moveEvent) => {
       if (isTouchEvent) moveEvent.preventDefault();
 
       const moveX = isTouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
       const moveY = isTouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
 
       let newWidth = startW + (moveX - startX);
       let newHeight = startH + (moveY - startY);
 
       const minWidth = 100;
       const minHeight = 100;
       const maxWidth = isMobile ? window.innerWidth - 40 : window.innerWidth;
       const maxHeight = isMobile ? window.innerHeight - 40 : window.innerHeight;
 
       newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
       newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
 
       setModalWidth(newWidth);
       setModalHeight(newHeight);
     };
 
     const stopResizing = () => {
       if (isTouchEvent) {
         window.removeEventListener("touchmove", doResize);
         window.removeEventListener("touchend", stopResizing);
       } else {
         window.removeEventListener("mousemove", doResize);
         window.removeEventListener("mouseup", stopResizing);
       }
     };
 
     if (isTouchEvent) {
       window.addEventListener("touchmove", doResize, { passive: false });
       window.addEventListener("touchend", stopResizing);
     } else {
       window.addEventListener("mousemove", doResize);
       window.addEventListener("mouseup", stopResizing);
     }
   };
 
   /***************************************************************************
    * 6) DRAGGING LOGIC (TITLE BAR)
    ***************************************************************************/
   const handleMouseDown = (e) => {
     if (typeof onMouseDown === "function") onMouseDown();
     if (!modalRef.current) return;
 
     // Only drag if user clicks inside the title bar
     if (!e.target.closest(".modal-titlebar")) return;
 
     const isTouchEvent = e.type === "touchstart";
     const startClientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
     const startClientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
     const offsetX = startClientX - modalRef.current.getBoundingClientRect().left;
     const offsetY = startClientY - modalRef.current.getBoundingClientRect().top;
 
     const handleMove = (moveEvent) => {
       if (isTouchEvent) moveEvent.preventDefault();
 
       const moveX = isTouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
       const moveY = isTouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
 
       let newLeft = moveX - offsetX;
       let newTop = moveY - offsetY;
 
       // If mobile, clamp so we don't drag off-screen
       if (isMobile) {
         const maxLeft = window.innerWidth - modalWidth - 20;
         const maxTop = window.innerHeight - modalHeight - 20;
         newLeft = Math.max(10, Math.min(newLeft, maxLeft));
         newTop = Math.max(10, Math.min(newTop, maxTop));
       }
 
       modalRef.current.style.left = `${newLeft}px`;
       modalRef.current.style.top = `${newTop}px`;
     };
 
     const stopDragging = () => {
       if (isTouchEvent) {
         document.removeEventListener("touchmove", handleMove);
         document.removeEventListener("touchend", stopDragging);
       } else {
         document.removeEventListener("mousemove", handleMove);
         document.removeEventListener("mouseup", stopDragging);
       }
     };
 
     if (isTouchEvent) {
       document.addEventListener("touchmove", handleMove, { passive: false });
       document.addEventListener("touchend", stopDragging);
     } else {
       document.addEventListener("mousemove", handleMove);
       document.addEventListener("mouseup", stopDragging);
     }
   };
 
   /***************************************************************************
    * 7) MAXIMIZE / RESTORE
    ***************************************************************************/
   const handleMaximizeToggle = () => {
     const toggledMaximized = !isMaximized;
     setIsMaximized(toggledMaximized);
 
     if (onMaximizeToggle) onMaximizeToggle(toggledMaximized);
 
     if (toggledMaximized) {
       // Fill entire area above the header (0,0) with height=calc(100vh - 40px)
       setModalWidth(window.innerWidth);
       setModalHeight(window.innerHeight - 40);
 
       if (modalRef.current) {
         modalRef.current.style.top = "0px";
         modalRef.current.style.left = "0px";
       }
     } else {
       // Restore dimension to match our defaults (desktop=800, mobile=200)
       setModalWidth(isMobile ? 200 : 800);
       setModalHeight(isMobile ? 200 : 500);
 
       // Also recenter with offsets
       if (modalRef.current) {
         const { topOffset, leftOffset } = calculateOffset();
         modalRef.current.style.top = isMobile
           ? `calc(50vh - 100px + ${topOffset}px)`
           : `calc(50vh - 250px + ${topOffset}px)`;
         modalRef.current.style.left = isMobile
           ? `calc(50vw - 100px + ${leftOffset}px)`
           : `calc(50vw - 400px + ${leftOffset}px)`;
       }
     }
   };
 
   /***************************************************************************
    * 8) IF NOT VISIBLE, DON'T RENDER
    ***************************************************************************/
   if (!isVisible) return null;
 
   /***************************************************************************
    * 9) MAIN STYLE LOGIC
    ***************************************************************************/
   // For desktop default = 800 wide → half is 400. Height=500 → half is 250.
   // For mobile default = 200 wide/height → half is 100.
   const topPosition = isMaximized
     ? "0px"
     : isMobile
       ? `calc(50vh - 100px + ${topOffset}px)`
       : `calc(50vh - 250px + ${topOffset}px)`;
 
   const leftPosition = isMaximized
     ? "0px"
     : isMobile
       ? `calc(50vw - 100px + ${leftOffset}px)`
       : `calc(50vw - 400px + ${leftOffset}px)`;
 
   // Styles for the main content area
   const mainAreaStyles = {
     flex: 1,
     overflow: "auto",
     fontSize: "14px",
     backgroundColor: "#fff",
     color: "#000",
     display: "flex",
     flexDirection: "column",
     ...customStyles.main,
   };
 
   return (
     <div
       ref={modalRef}
       style={{
         position: "absolute",
         top: topPosition,
         left: leftPosition,
         // If maximized => width: 100vw; else normal
         width: isMaximized ? "100vw" : `${modalWidth}px`,
         // If maximized => height: calc(100vh - 40px); else normal
         height: isMaximized
           ? `calc(100vh - 40px)`
           : `${modalHeight}px`,
         backgroundColor: "#fff",
         border: "2px solid black",
         display: isVisible ? "flex" : "none",
         flexDirection: "column",
         zIndex: zIndex + stackIndex,
         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
         overflow: "hidden",
         ...customStyles.container,
       }}
       onMouseDown={handleMouseDown}
       onTouchStart={handleMouseDown}
     >
       {/* Title Bar */}
       <div
         className="modal-titlebar"
         style={{
           backgroundColor: "#000080",
           color: "white",
           height: "30px",
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
           padding: "0 10px",
           fontSize: "14px",
           userSelect: "none",
           cursor: "move",
           ...customStyles.titleBar,
         }}
         onMouseDown={handleMouseDown}
         onTouchStart={handleMouseDown}
       >
         {/* If there's a custom title bar, use that, otherwise default */}
         {customTitleBar ? customTitleBar : <span>{title}</span>}
 
         <div style={{ display: "flex", gap: "5px" }}>
           {/* Minimize Button */}
           <button
             onClick={(e) => {
               e.stopPropagation();
               if (onMinimize) onMinimize();
             }}
             style={{
               background: "none",
               border: "none",
               color: "white",
               fontSize: "16px",
               lineHeight: "14px",
               cursor: "pointer",
             }}
             title="Minimize"
           >
             &#x2212;
           </button>
 
           {/* Maximize / Restore */}
           <button
             onClick={(e) => {
               e.stopPropagation();
               handleMaximizeToggle();
             }}
             style={{
               background: "none",
               border: "none",
               color: "white",
               fontSize: "16px",
               lineHeight: "14px",
               cursor: "pointer",
             }}
             title={isMaximized ? "Restore" : "Maximize"}
           >
             {isMaximized ? "🗗" : "🗖"}
           </button>
 
           {/* Close */}
           <button
             onClick={(e) => {
               e.stopPropagation();
               onClose();
             }}
             style={{
               background: "none",
               border: "none",
               color: "white",
               fontSize: "16px",
               lineHeight: "14px",
               cursor: "pointer",
             }}
             title="Close"
           >
             ✕
           </button>
         </div>
       </div>
 
       {/* Menu Bar */}
       {showMenuBar && (
         <div
           style={{
             backgroundColor: "#c0c0c0",
             borderBottom: "1px solid #808080",
             padding: "5px 10px",
             fontSize: "12px",
             display: "flex",
             userSelect: "none",
             ...customStyles.menuBar,
           }}
         >
           {customMenuBar ? (
             customMenuBar
           ) : (
             <>
               <span style={{ marginRight: "15px", cursor: "pointer" }}>File</span>
               <span style={{ marginRight: "15px", cursor: "pointer" }}>Edit</span>
               <span style={{ marginRight: "15px", cursor: "pointer" }}>Search</span>
               <span style={{ marginRight: "15px", cursor: "pointer" }}>Help</span>
             </>
           )}
         </div>
       )}
 
       {/* Main Content Area */}
       <div style={mainAreaStyles}>{content}</div>
 
       {/* Status Bar */}
       {showStatusBar && (
         <div
           style={{
             backgroundColor: "#c0c0c0",
             borderTop: "1px solid #808080",
             height: "25px",
             display: "flex",
             alignItems: "center",
             justifyContent: "space-between",
             fontSize: "12px",
             color: "black",
             userSelect: "none",
             ...customStyles.statusBar,
           }}
         >
           {customStatusBar ? (
             customStatusBar
           ) : (
             <>
               <span>Ln 1, Col 1</span>
               <span>100%</span>
             </>
           )}
         </div>
       )}
 
       {/* Resize Handle (bottom-right corner) */}
       {!isMaximized && (
         <div
           onMouseDown={startResizing}
           onTouchStart={startResizing}
           style={{
             width: "15px",
             height: "15px",
             backgroundColor: "#c0c0c0",
             borderTop: "1px solid #808080",
             borderLeft: "1px solid #808080",
             cursor: "nwse-resize",
             alignSelf: "flex-end",
             userSelect: "none",
             ...customStyles.resizer,
           }}
         />
       )}
     </div>
   );
 };
 
 export default ModalWindow;
 