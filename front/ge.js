function getMealInfo() {
    // 나이스 급식 API 엔드포인트
    const apiUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo';

    // 학교 코드와 날짜 설정 (예시 코드이므로 실제 학교 코드와 날짜로 변경 필요)
    const rydbrcjd = 'J10'; // 교육청 코드 , 경기도 코드  :J10
    const key = '9da4db4b2cb844b4be2ae2006cd2dacb';
    const schoolCode = '7751036'; // 학교 코드 : 7010738 , 용동중 : 7751036
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
    console.log(date);

    // API 호출x    
    fetch(`${apiUrl}?KEY=${key}&ATPT_OFCDC_SC_CODE=${rydbrcjd}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date}&Type=json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.mealServiceDietInfo);
            const mealData = data.mealServiceDietInfo[1].row[0].DDISH_NM;
  
            // <br/> 태그를 기준으로 텍스트를 분할하고 각 부분을 줄바꿈하여 사용자에게 표시
            const formattedMealData = mealData.split('<br/>').join('\n');

            // HTML 엘리먼트에 급식 정보 표시
            document.getElementById('meal-content').innerText = formattedMealData;
        })
        .catch(error => {
            console.error('API 호출 중 오류 발생:', error);
        });
}