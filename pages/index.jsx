import React, {useEffect} from "react";
import { useRouter } from "next/router";

const index = () => {
  const Router = useRouter();
  useEffect(() => {
    Router.push('/login');
  })
  return (
    <div>
    </div>
  );
};

export default index;
