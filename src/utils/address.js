export function reverseGeocoder (qqMapSdk) {
  return new Promise((resolve, reject) => {
    qqMapSdk.reverseGeocoder({
      get_poi: 1,
      success: (res) => resolve(res),
      fail: (res) => reject(res)
    })
  })
}
