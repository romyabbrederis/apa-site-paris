import { getMenu } from "../lib/menus";
import Link from "next/link";

export default function Menu() {
  const menus = getMenu('fr')
  console.log("menus", menus)
  return (
    <div className={"container"}>
      {menus.map((item, i) => (
        <Link href={item.slug}>{item.name}</Link>
      ))}
    <style jsx>{`
        .container {
          display: flex;
          justify-content: space-evenly;
          margin: 0 auto;
          width: 100%;
          padding: 0 1em;
        }
      `}</style>
    </div>
  ) 
  
  
}

