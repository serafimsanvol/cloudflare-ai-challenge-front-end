"use client";
import { useState } from "react";
import { set, useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // fetch
  const [resultText, setResultText] = useState("");
  const [resultSummary, setResultSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [loadingError, setLoadingError] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const transcribe = async (data: any) => {
    console.log("transcribe called");
    const url = encodeURIComponent(data.url);
    setIsLoading(true);
    setLoadingText("Transcribing video...");
    fetch(`${BASE_URL}/video/transcribe?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data");
        setResultText(data.result.text);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
        setLoadingText("");
      });
    console.log(data);
  };

  const onSubmit = async (data: any) => {
    setResultText("");
    setResultSummary("");
    setLoadingError("");
    const url = encodeURIComponent(data.url);
    setIsLoading(true);
    setLoadingText("Saving video...");
    try {
      await fetch(`${BASE_URL}/video/save?url=${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      setLoadingError("Error saving video");
      console.log(error);
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }

    transcribe(data);
  };

  const onSummarize = async (data: any) => {
    setIsLoading(true);
    fetch(`${BASE_URL}/video/summarize`, {
      method: "POST",
      body: JSON.stringify({ text: resultText }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setResultSummary(data.result.translated_text);
      })
      .catch(console.log);
    // .finally(() => setIsLoading(false));
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="join">
        <input
          disabled={isLoading}
          {...register("url", {
            required: true,
          })}
          type="text"
          name="url"
          placeholder="Paste link here"
          className={
            "input join-item input-bordered w-full max-w-md" +
            (errors.url ? "input-error" : "")
          }
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`btn btn-primary join-item ${isLoading && "btn-disabled"}`}
        >
          Get Started
        </button>
      </form>
      {isLoading && (
        <p className="loading loading-ball loading-lg mt-4 bg-primary"></p>
      )}
      {isLoading && <p className="mt-4 text-center">{loadingText}</p>}
      {loadingError && <p className="mt-4 text-center">Error:{loadingError}</p>}
      {resultText && <p className="mt-4 text-center">Your result:</p>}
      {resultText && (
        <p className="prose-p mt-4 max-w-lg text-center">{resultText}</p>
      )}
      {resultText && (
        <button onClick={onSummarize} className="btn btn-primary mt-4">
          Translate
        </button>
      )}
      {resultSummary && (
        <p className="prose-p mt-4 max-w-lg text-center">{resultSummary}</p>
      )}
    </div>
  );
};

export default Page;
