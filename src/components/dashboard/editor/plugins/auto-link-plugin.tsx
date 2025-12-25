"use client";

import type { JSX } from "react";

import {
  createLinkMatcherWithRegExp,
  AutoLinkPlugin as LexicalAutoLinkPlugin,
} from "@lexical/react/LexicalAutoLinkPlugin";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as React from "react";

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[#%+\-.0-:=@-Z_a-z~]{1,256}\.[()0-9A-Za-z]{1,6}\b([#%&()+\-.0-:A-Za-z@/=?_~]*)(?<![%()+\-.:])/;

const EMAIL_REGEX =
  /(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([\-0-9a-z]+\.)+[a-z]{2,}))/i;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text.startsWith("http") ? text : `https://${text}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

export function AutoLinkPlugin(): JSX.Element {
  return <LexicalAutoLinkPlugin matchers={MATCHERS} />;
}
