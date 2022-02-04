import { HttpClientService } from '~SERVICES/HttpClient.service'

export class WassiService extends HttpClientService {
  constructor() {
    const { apiUrl } = global.config.wassi
    super(apiUrl, '/v1/messages')
  }

  public async sendMessage(phone: string, message: string): Promise<any> {
    /*
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.wassi.chat/v1/messages",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{\"phone\":\"".$number."\",\"message\":\"".$body."\",\"device\":\"61e5bb67625a563809c2fca8\"}",
        CURLOPT_HTTPHEADER => array(
            "content-type: application/json",
            "token: 9db5765ad945eb5b106ecc549ec63f47c91a35a9d440fc45aa8d0cab5f1bd083871c53931c3feaa1"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }
    */
    //  console.log(this.device);

    const body = { phone, message, device: this.device }

    try {
      const { status, data } = await this.http.post('/', body)

      console.log('Mensaje enviado a:', (data as TWassiResponse)?.phone)
      console.log('STATUS', status)

      return data
    } catch (error) {
      return null
    }
  }
}
