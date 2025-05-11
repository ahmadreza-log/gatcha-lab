import { Response } from "express";

const ResponseHandler = (res: Response, data: object | string | null, status: number = 200) => {

    let success = (status >= 200 && status <= 299) || [301, 302, 303, 307, 308].includes(status)

    return res.status(status).json({ success, data })

}

export default ResponseHandler