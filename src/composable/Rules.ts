export const useValidIdCard = (idCard:string) => {
  // 计算校验码所需的权重因子
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 正则表达式检查基本格式
  const regex = /^(\d{6})(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(\d{3})(\d|X|x)$/
  if (!regex.test(idCard)) {
    return false
  }

  // 提取身份证各部分
  //   const addressCode = idCard.substring(0, 6)
  const birthYear = idCard.substring(6, 10)
  const birthMonth = idCard.substring(10, 12)
  const birthDay = idCard.substring(12, 14)
  //   const orderCode = idCard.substring(14, 17)
  const checkCode = idCard.charAt(17).toUpperCase()

  // 验证日期有效性
  if (!useValidDate(birthYear, birthMonth, birthDay)) {
    return false
  }

  // 计算校验码
  const weightedSum = idCard.substring(0, 17).split('').map((char:string, index:number) => parseInt(char, 10) * factors[index]).reduce((sum:number, current:number) => sum + current, 0)
  const modulo = weightedSum % 11
  const checkCodeTable = '10X98765432'
  const calculatedCheckCode = checkCodeTable.charAt(modulo)

  // 比较计算出的校验码与给定的校验码
  return calculatedCheckCode === checkCode
}

// 辅助函数验证日期是否有效
const useValidDate = (year:string, month:string, day:string) => {
  const date = new Date(`${year}-${month}-${day}`)
  return (
    date.getFullYear() === parseInt(year, 10) &&
        date.getMonth() + 1 === parseInt(month, 10) &&
        date.getDate() === parseInt(day, 10)
  )
}
export const isValidPhoneNumber = (phoneNumber: string) => {
  // 正则表达式匹配手机号（中国大陆）
  const mobilePattern = /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  // 正则表达式匹配固定电话（区号3-4位，电话号码7-8位，可包含"-")
  const landlinePattern = /^(\d{3,4}-)?\d{7,8}$/

  // 检查是否为有效的手机号或固定电话号码
  return mobilePattern.test(phoneNumber) || landlinePattern.test(phoneNumber)
}
