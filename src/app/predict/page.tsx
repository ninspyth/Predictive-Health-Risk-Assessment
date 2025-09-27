import "tailwindcss"

import bgImage from "../../../public/assets/bg.jpg"
import NavbarMenu from "../components/NavBar"
import { Cardbots } from "../components/Card"

export default function Predict() {
   return (
      <>
         <div
            style={{
               backgroundImage: `url(${bgImage.src})`,
               backgroundPosition: "center",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat",
               width: "100vw",
               height: "100vh"
            }}
         >
            <NavbarMenu></NavbarMenu>
            
            <Cardbots></Cardbots>

         </div>
      </>
   ) 
}