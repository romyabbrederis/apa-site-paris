import Head from "next/head";
import Menu from "../components/Menu";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="layout-container"></div>;
}
