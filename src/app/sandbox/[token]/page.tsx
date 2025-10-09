import * as jose from "jose";
import SandboxIndex from "@/feature/sandbox/page";

export default async function PageSandboxWithToken({ params }: { params: { token: string } }) {
  let data: any = null;

  const token = params.token;

  if (token) {
    const secret = new TextEncoder().encode("Seanard-MC-Blueprint");
    const { payload } = await jose.jwtVerify(token, secret);
    data = payload;
  }

  return <SandboxIndex data={data?.data || null} />;
}
