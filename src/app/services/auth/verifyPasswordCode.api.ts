import { VerifyPasswordCodeType } from "@/schema/VerifyPasswordCodeSchema";
import axios from "axios";
import toast from "react-hot-toast";

export default async function verifyPasswordCode(
  values: VerifyPasswordCodeType,
  router: any,
) {
  const loadingId = toast.loading("Loading");
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    console.log(data);
    if (data.status == "Success") {
      toast.success("code verifyed");
      router.push("/resetPassword");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.log(error);
  } finally {
    toast.dismiss(loadingId);
  }
}
