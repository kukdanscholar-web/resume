import { Suspense } from "react";
import { connection } from "next/server";
import ProfileApp from "@/components/ProfileApp";
import { calculateAges, todayInSeoul } from "@/lib/age";

// 생년월일은 서버에서만 읽고, 화면에는 계산된 나이만 내려보낸다.
async function Age() {
  await connection();
  const birth = process.env.BIRTH_DATE;
  if (!birth) return null;
  const ages = calculateAges(birth, todayInSeoul());
  return (
    <>
      {ages.korean}세(만 {ages.international}세)
    </>
  );
}

export default function Home() {
  return (
    <ProfileApp
      age={
        <Suspense fallback={null}>
          <Age />
        </Suspense>
      }
    />
  );
}
