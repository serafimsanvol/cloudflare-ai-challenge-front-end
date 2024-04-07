import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

export default async function Home() {
  return (
    <div className="hero min-h-[90vh]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="pb-4 text-5xl font-bold">Summarizer</h1>
          <p className="pb-6">
            Summarizer is an AI summarization tool that generates summaries for
            youtube videos. It uses AI to generate summaries for youtube videos.
          </p>
          <div className="join">
            <input
              type="text"
              placeholder="Paste link here"
              className="input join-item input-bordered w-full max-w-md"
            />
            <button className="btn btn-primary join-item">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
