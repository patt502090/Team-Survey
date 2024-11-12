"use client";
import Link from "next/link";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <img
          className="w-auto mx-auto"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
          alt="404 Not Found"
        />
        <h1 className="text-2xl font-semibold text-blue-600">404 Not Found</h1>
        <p className="mt-2 text-2xl font-bold text-gray-800">
          Whoops! That page doesn’t exist.
        </p>
        <p className="mt-4 text-gray-500">
          Here are some helpful links instead:
        </p>
        <ul className="mt-4 space-x-4">
          <li className="inline">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              dashboard
            </Link>
          </li>
          <li className="inline">
            <Link href="/team" className="text-gray-600 hover:text-gray-900">
              team
            </Link>
          </li>
          <li className="inline">
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
