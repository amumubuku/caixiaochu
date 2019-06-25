/*
 * @Description: mpvueRsa
 * @Author: fizz
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-19 17:17:29
 * @LastEditTime: 2019-05-11 11:31:28
 */
import JSEncrypt from 'mpvue-jsencrypt'
export function rsa (data) {
  let publicKey = '-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA3WzKs1amT/iBc4pUKoU1pR9djAWb5/kTiccJ5qNZB+8BXQkL4A/3H0Q134FwQfAHqKL6sVoYEfBzK1vJ+q5J+vKA2vUrYQY3yn0lPBV73DTR+KuG2/1i0UCkhvALB0fRAsJQpncfwqI9c11UoKAABsErgAiZl3/cW40a0/JAslu37TmmamQEq7y7alf6QYBjy1ELa4Swivo/FMoCl7zR6Ch10/GJRZW+2wEGOfEK6j7eYROwFUuwCpWFVtzEfd3TE3TweVYQ/y15t+q7xpyRzMbGHRy+zanf8WS1B2K8n/zkvb8yaO3lsy4crVjmM1Xiz8ixQO7hol59ItQjuiavtJlcJZhhs/i8ZtggnUdTAjy173a/qIs4ON6HuHzaqWdIwovXvJcOGi2GajzfrlG3zH+hjE40Ydhlpc310qEB++soZMg8w1JhKGQ//xnuE7s96iouEJIP+DlcMIKja9gWgUi34pg7CeUwWI4T4Ch2Vugl5I/ZzUEtz7H4hkoQuLx61zB5fXJp9jNOh48LbPqJiSr5Tyq/HEUnO4D4tHLzVZGaTAsQ9FMqgzhjZK0PVB6TFQcetvO8ahr+Zq5wZCm/EwR9QaYm3gOJEmwzHTxWJpnLSKmT8ggQP8FgqALDEvBVlnl5tOonCqZcdqCYoDHsLe0891RlekPcrB3gVSW4DNMCAwEAAQ==-----END PUBLIC KEY-----'
  let encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(data)
}
