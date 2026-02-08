import { LoginType } from "@/schema/LoginSchema";
import axios from "axios";
import toast from "react-hot-toast";

export default async function signIn(values: LoginType, router: any) {
  const loadingId = toast.loading("Loading");
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    if (data.message == "success") {
      toast.success("logged in successfully");
      router.push("/");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(loadingId);
  }
}
