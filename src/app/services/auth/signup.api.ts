import { RegisterType } from "@/schema/RegisterSchema";
import axios from "axios";
import toast from "react-hot-toast";

export default async function signUp(values: RegisterType, router: any) {
  const loadingId = toast.loading("Loading");
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    if (data.message == "success") {
      toast.success("account created successfully");
      router.push("/login");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(loadingId);
  }
}
