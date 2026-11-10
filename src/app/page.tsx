import { Suspense } from "react";
import { connection } from "next/server";
import ProfileApp from "@/components/ProfileApp";
import { BIRTH_DATE } from "@/data/birth";
import { calculateAges, todayInSeoul } from "@/lib/age";

// 나이는 접속한 날짜를 기준으로 서버에서 계산한다.
async function Age() {
  await connection();
  const ages = calculateAges(BIRTH_DATE, todayInSeoul());
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
