"use client";

import React, { useState } from "react";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import HorizontalRule from "../HorizontalRule";
import styles from "./RegisterPage.module.css";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return "이름을 입력해주세요.";
        if (value.length < 2) return "이름은 2글자 이상이어야 합니다.";
        break;
      case "email":
        if (!value.trim()) return "이메일을 입력해주세요.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "올바른 이메일 형식이 아닙니다.";
        break;
      case "password":
        if (value.length < 4) return "비밀번호는 4자 이상이어야 합니다.";
        break;
      case "passwordRepeat":
        if (value !== values.password) return "비밀번호가 일치하지 않습니다.";
        break;
      default:
        break;
    }
    return "";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await fetch(`https://learn.codeit.kr/api/link-service/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      alert("회원가입 성공");
      router.push("/login");
    } catch (err) {
      setError(err.message || "문제가 발생했습니다. 회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }

    // TODO: 회원가입 처리
    // 1. fetch 를 사용하여 회원가입 요청을 보냅니다.
    // 2. 성공 시 응답 데이터를 확인합니다.
    // 3. 로딩 상태를 만들고 로딩중일 때는 회원가입 버튼을 비활성화 합니다.
    // 4. 추가로 로딩중일 때는 회원가입 버튼텍스트를 "회원가입 중..."으로 변경합니다.
    // 5. 에러 상태를 만들고 회원가입 요청이 실패 시 에러 메시지를 회원가입버튼 바로 위에 표시합니다.
  }

  return (
    <>
      <h1 className={styles.Heading}>회원가입</h1>
      <Button
        className={styles.GoogleButton}
        type="button"
        appearance="outline"
        as="a"
        href="https://learn.codeit.kr/api/link-service/auth/google"
      >
        <img src="/images/google.svg" alt="Google" />
        구글로 시작하기
      </Button>
      <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="김링크"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <div className={styles.Error}>{errors.name}</div>}
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="example@email.com"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <div className={styles.Error}>{errors.email}</div>}
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>

        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div className={styles.Error}>{errors.password}</div>
        )}
        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.Input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        {errors.passwordRepeat && (
          <div className={styles.Error}>{errors.passwordRepeat}</div>
        )}
        {error && (
          <div className={styles.Error} role="alert" aria-live="polite">
            {error}
          </div>
        )}
        <Button className={styles.Button}>
          {""}
          {isLoading ? "회원가입 중..." : "회원가입"}
        </Button>
        <div>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
