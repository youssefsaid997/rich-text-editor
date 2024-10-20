"use client";
import Tiptap from "@/components/TextEditor/Tiptap";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";

function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <div>
        <Tiptap />
      </div>
    </>
  );
}

export default HomePage;
