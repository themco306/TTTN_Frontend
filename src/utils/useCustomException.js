import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';


function useCustomException() {
    const { logoutContext } = useAuth();

    const handleException = (error) => {
        const res=error?.response
        switch (res.status) {
            case 400:
                if (res.data && res.data.errors) {
                    Object.keys(res.data.errors).forEach((key) => {
                        toast.error(res.data.errors[key][0]);

                    })
                    break;
                }
                toast.error(res.data.error)
                break;
            case 401:
                toast.error(error.response.data.error);
                logoutContext();
                break;
            case 403:
                if(!error.response.data){
                    toast.warn('Bạn không có quyền làm điều này!!')
                }else{
                    toast.warn(error.response.data.error)
                }
                break;
                case 404:
                    toast.error(error.response.data.error);
                    break;
            default:
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
                break;
        }
        console.error("Error:", error);
    };

    return handleException;
}

export default useCustomException;
