
        let table = document.getElementById('table');   /* 왼쪽 좌석표 100석 그릴 변수 */
        let movieInfoBox = document.getElementById('movie_info');  /* 영화정보 그릴때 사용 */
        let selectedSeat = document.getElementById('selected_seat');   /* 우측에 표시할 장바구니에 담긴 좌석 그리는 거 */
        let totalPrice = document.getElementById('total_Price');  /* 최종결제금액 */
        let typeAmount = document.getElementById('type_amount');  /* 타입별 인원 */
        // ----------------------------------------------------------------------
        /* 성인 요금 배열: 15000, 청소년 요금 : 12000, 경로 요금 : 10000 */
        let typePrice = [15000, 12000, 10000];  
        // -----------------------------------------------------------------------------------
        let types = document.getElementById('type');
        let type = ['성인', '청소년', '경로'];
        let typeCnt = [0,0,0];  /* 성인/청소년/경로 카운트 저장할 배열 */
        // 0:성인 카운트 , 1:청소년 카운트, 2: 경로 카운트
        console.log(typeCnt);
        function render_type(){
            let result = '';  /* 결과물 변수 */
            // 반복문으로 그리기
            for(let i = 0; i<type.length; i++){
                result += `<div class="type">
                            <span class="typeName">${type[i]}</span>
                            <div class="numBox">
                                <button onclick = "minus(${i})" class="minus">-</button>
                                <span id="num">${typeCnt[i]}</span>
                                <button onclick ="plus(${i})" class = "plus">+</button>
                            </div>
                        </div>`;
            }
            let num = document.getElementById('num');
            types.innerHTML = result;
            render_table();
            // add_seat();
        }
        function minus(i){
            let totalCnt = typeCnt[0] + typeCnt[1] + typeCnt[2];
            if(typeCnt[i]==0){
                alert('0명 이하는 선택불가합니다.');
            }else if(totalCnt==cart.length){  /* 카트에 담긴 수보다, 더 줄일 수 없음. */
                alert('선택된 좌석보다 줄일 수는 없습니다.');
                return;
            }else{
                typeCnt[i]--;
                num.innerText = typeCnt[i];
            }
            // console.log(typeCnt[i]);
            render_type();
            render_price();
            render_typeResult();
        }
        function plus(i){
            let totalCnt = typeCnt[0] + typeCnt[1] + typeCnt[2];
            
            
            if(totalCnt==8) {
                alert('인원선택은 총 8명까지만 가능합니다');
            }else{
                typeCnt[i]+=1;
                num.innerText = typeCnt[i];
                console.log('플러스때typeCnt[0]',typeCnt[0]);
                console.log('플러스때typeCnt[1]',typeCnt[1]);
                console.log('플러스때typeCnt[2]',typeCnt[2]);
            }

            console.log('플러스때totalCnt',totalCnt);

            render_selectedSeats();
            render_type();
            render_price();
            render_typeResult();
            
            // add_seat();
        }
        
       
        // -----------------------------------------------------------------------------------
        // 2차원 배열로 표 만들기
        const seat_Map = Array.from(Array(10),() => new Array(10));

        // 행 배열
        const row = ['A','B','C','D','E','F','G','H','I','J'];
        // 희망 좌석 담을 배열 (A1, j96 ... )
        const cart = [];

        // 총 예약희망 수 (8명까지만 가능)
        let count = 0;

        let movie = {
            ageRaing: 'ALL', // 나이 제한
            movieName: '룩백',  // 영화제목
            filmType: '2D Dolby V+A(자막)',
            theaterName: '상암월드컵경기장',
            screenName: 'DOLBY VISION+ATMOS',
            playDate: '2026.10.11(일)',
            showTime: '08:40 ~ 10:30',
            posterUrl: `<img src="images/lookback.jpg" alt="룩백">`
        };

        // 표 그리는 함수
        function render_table(){
            // 출력할 변수 results
            let results = '';
            // 총인원수 변수
            let totalCnt = typeCnt[0] + typeCnt[1] + typeCnt[2];
            // 선택가능인원 변수 (총인원 - 카드배열 길이(선택된 인원수))
            let possibleCnt = totalCnt - cart.length;
            // [추가] #table 태그에 현재 인원 수에 맞는 클래스 부여 (예: table hover-count-2)
            // 호버기능을 위해, 제미나이 추천 함수
            table.className = `table hover-count-${possibleCnt}`;

            // console.log('121212',totalCnt);
            let tmp = 1;  /* table 안에 표시하는 좌석번호 글자 변수(1부터 100까지 그려낼 변수) */
            for(let i = 0; i<seat_Map.length; i++){
                for(let j = 0; j<seat_Map[i].length; j++){
                    if(seat_Map[i][j]==-1) {  // 좌석예약(결제)이 된 경우 그림
                        results += `<div class="cell reserved" onclick = "add_seat(${i},${j})"><span class="seat_number">${tmp}</span></div>`; 
                    } else if(seat_Map[i][j]==1) {  // 카트에 담긴 경우 그림
                        results += `<div class="cell onCart" onclick = "add_seat(${i},${j})"><span class="seat_number">${tmp}</span></div>`; 
                    } else {   // 아직 빈 좌석인 경우 (seat_Map[i][j]==0 인 경우)
                        if(possibleCnt==1){  /* 한명만 선택한 경우, 짝수열은 선택안되게 그림만 그림 */
                            if(j%2==0){  
                                results += `<div class="cell oddBlank" onclick = "add_seat(${i},${j})"><span class="seat_number">${tmp}</span></div>`; 
                            }else{
                                results += `<div class="cell evenBlank" onclick = "add_seat(${i},${j})"><span class="seat_number">${tmp}</span></div>`; 
                            }
                        }else {  /* 2명 이상인 경우 */
                            results += `<div class="cell blank" onclick = "add_seat(${i},${j})"><span class="seat_number">${tmp}</span></div>`; 
                        }
                    }
                    tmp ++;
                    
                }
            }
            table.innerHTML = results;
        }

        let addSeat = document.querySelectorAll('.cell');
    
        function movieInfo(){
            // 영화 정보들 그리기
            let results ='';
            results += `<div class="movieInfo">${movie.ageRaing}${movie.movieName}
                <br/>${movie.filmType}</div>
                <div class = "movieDetail"><div class="theaterInfo">${movie.movieName}<br/>
                    ${movie.theaterName}<br/>
                    ${movie.screenName}<br/>
                    ${movie.playDate}<br/>
                    ${movie.showTime}</div>
                <div class = "poster_img">${movie.posterUrl}</div></div>
                </div>`;

            movieInfoBox.innerHTML = results;    
        }   

        // 좌석 선택하는 함수
        function add_seat(i, j){
            // 1. totalCnt !=0 아닌지 확인하는 단계
            let totalCnt = typeCnt[0] + typeCnt[1] + typeCnt[2];
            // console.log('add_seat 할때 typeCnt[0]',typeCnt[0]);
            // console.log('add_seat 할때 typeCnt[1]',typeCnt[1]);
            // console.log('add_seat 할때 typeCnt[2]',typeCnt[2]);
            let possibleCnt = totalCnt-cart.length;
            if(totalCnt==0){  // 아직 인원 선택안한 경우
                alert('인원부터 선택해주세요');
                return;
            }
            
            // 2. 좌석 이름 생성 (카트에 담을때 사용하는 변수 ex)A1, J100)
            let seatName = `${row[i]}${j+1}`;
            
            // 3. 결제된 상태인지 / 기존 선택한 좌석인지 확인하는 단계
            if(seat_Map[i][j]==-1){  // 예약된 좌석(결제처리)가 된 경우
                alert('예약된 좌석입니다');
                return;
            }

                
            if(seat_Map[i][j]==1){  // cart에 있는 경우 -> 기존꺼 취소
                // 선택한 좌석 좌우로 아무도 없는 경우 (1좌석 단독 취소)
                if((j==0 ||seat_Map[i][j-1]==0) && (j ==9||seat_Map[i][j+1]==0)){
                    seat_Map[i][j] = 0;   /* 취소해서 0으로 돌리기 */
                    for(let k = 0; k<cart.length; k++){
                        if(cart[k]==seatName){
                            cart.splice(k,1);
                            break;   // 반복문 종료
                        }
                    }
                    render_type();
                    render_price();
                    render_table();
                    render_selectedSeats();
                    // console.log(possibleCnt);
                }else{  /* 2명 이상인 경우  */
                    // j<9 조건 추가
                    if(j<9 && seat_Map[i][j+1]==1){  /* 선택한 좌석 우측에 있는 좌석이 선택된 좌석인 경우 => 둘 다 0으로 초기화*/
                        // 반복문으로, 두 좌석을 카트에서 찾아서, 삭제 
                        for(let k = 0; k<cart.length; k++){
                            if(`${row[i]}${j+1}` == cart[k]){
                                cart.splice(k, 1);
                            }
                        }
                        for(let k = 0; k<cart.length; k++){
                            if(`${row[i]}${j+2}` == cart[k]){
                                cart.splice(k, 1);
                            }
                        }
                        seat_Map[i][j+1] = 0;
                        seat_Map[i][j] = 0;
                        
                    // j>0 큰 경우 추가    
                    }else if(j>0 && seat_Map[i][j-1]==1){ /* 선택한 좌석 왼쪽에 있는 좌석이 선택된 좌석인 경우 => 둘 다 0으로 초기화*/
                        for(let k = 0; k<cart.length; k++){
                            if(`${row[i]}${j+1}` == cart[k]){
                                cart.splice(k, 1);
                            }
                        }
                        for(let k = 0; k<cart.length; k++){
                            if(`${row[i]}${j}` == cart[k]){
                                cart.splice(k, 1);
                            }
                        }
                        seat_Map[i][j-1] = 0;                            
                        seat_Map[i][j]=0;
                    }else{    // 좌우에 1이 없는 외톨이 좌석인 경우 -> 나 혼자만 삭제!
                        seat_Map[i][j] = 0;
                        for(let k = 0; k<cart.length; k++){
                            if(cart[k]==seatName){
                                cart.splice(k, 1);
                                // break;
                            }
                        }
                    
                    }
                    render_type();
                    render_price();
                    render_table();
                    render_selectedSeats();
                    return;
                }
            }else{  /* cart에도 없고, 예약된 좌석도 아닐시 */

                    if(totalCnt==cart.length){
                    alert('선택한 좌석 취소 후 선택해주세요');
                    return;
                    }

                    if(possibleCnt==1){   /* 1명만 선택한 경우 */
                        if(j%2!=0){  /* 짝수 열인 경우 */
                            alert('짝수열은 선택불가');
                        }else{
                            seat_Map[i][j] = 1;  /* 1로 바꾸고 */
                            cart.push(seatName);   /* 카트에도 담는 단계 */
                        }
                    }else{   /* 2명 이상인 경우 */
                        let possibleCnt = totalCnt-cart.length;
                        
                        // j=9 인경우에는, 2좌석을 연속으로 선택 불가능
                        // (101)번째 열 생성 문제 방지
                        if(j==9){
                            alert('오른쪽 끝 좌석에서는 2명 좌석을 연속으로 선택불가능');
                            return;
                        }

                        // 바로 옆 좌석이 이미 예약된 경우(-1이나 1인 경우 막기)
                        if(seat_Map[i][j+1]==-1){
                            alert('옆 좌석은 이미 예약되어있습니다');
                            return;
                        } else if(seat_Map[i][j+1]==1){
                            alert('이미 선택하신 좌석입니다.');
                            return;
                        }
                        // 2좌석 담는 단계
                        for(let k = 0; k<2; k++){
                            seat_Map[i][j+k] = 1;
                            seatName = `${row[i]}${j+k+1}`;
                            cart.push(seatName);   /* 카트에도 담는 단계 */

                        }
                        // possibleCnt -= 2;
                        console.log('가능수',possibleCnt);

                        // seat_Map[i][j] = 1;  /* 1로 바꾸고 */
                    }
                        // render_table();
            }
            // console.log('add_seat 할때 totalCnt',totalCnt);
            render_table();
            render_selectedSeats();
        }

        // 우측에 선택한 좌석 그리는 함수
        function render_selectedSeats(){
            // 그릴 변수
            let result = '';
            // 반복문으로 그리기
            for(let i = 0; i<8; i++){
                if(i<cart.length){
                    // console.log('55555',cart[i]);
                    result += `<div class="onCart_cell active">${cart[i]}</div>`;
                }else{
                    result += `<div class="onCart_cell">-</div>`;
                }
            }
            selectedSeat.innerHTML = result;
            // render_type();
            // render_table();
            // movieInfo();
            // render_selectedSeats();
        }

        // 최종결제 금액 함수
        function render_price(){
            // 결과 그려낼 변수
            // let result = 0;
            let sum = 0;  // 최종금액 합계 담아낼 변수
            
            for(let i = 0; i<typeCnt.length; i++){
                let totalP = typeCnt[i] * typePrice[i];
                sum += totalP
            }
            totalPrice.innerHTML = sum.toLocaleString() + '원';
        }

        // 리셋버튼
        function resetBtn(){
            // 총인원 변수
            let totalCnt = typeCnt[0] + typeCnt[1] + typeCnt[2]  ;
            totalCnt = 0;
            for(let i = 0; i<typeCnt.length; i++){
                typeCnt[i] = 0;
                console.log('3333',typeCnt[i]);
            }
            for(let i = 0; i<seat_Map.length; i++){
                for(let j = 0; j<seat_Map[i].length; j++){
                    if(seat_Map[i][j]==1){
                        seat_Map[i][j] = 0;
                    }
                }
            }
            cart.length = 0;  /* 카트 비우기 */
            typeCnt[0] = 0;
            typeCnt[1] = 0;
            typeCnt[2] = 0;
            // totalPrice = 0;
            render_table();
            render_type();
            render_price();
            render_selectedSeats();
            render_typeResult();
            // add_seat();
        }

        // 다음버튼
        function nextBtn(){
            // 총인원 변수
            let totalCnt = typeCnt[0] + typeCnt[1] + typeCnt[2]  ;
            console.log('5',totalCnt);
            // 인원수 안누를 경우, 경고
            if(totalCnt==0){
                alert('인원부터 선택해주세요');
                // return;
            }else if(cart.length<totalCnt){
                alert('좌석을 덜 선택하셨습니다.');
            }else{
                alert('좌석예약되었습니다.');
                for(let i = 0; i<seat_Map.length; i++){
                    for(let j = 0; j<seat_Map[i].length; j++){
                        if(seat_Map[i][j] == 1){
                            seat_Map[i][j] = -1;   // 예약좌석으로 바꾸기
                        }
                    }
                }
                // 모두 초기화
                cart.length = 0;
                // 타입별로도 초기화
                typeCnt[0] = 0;
                typeCnt[1] = 0;
                typeCnt[2] = 0;
                render_selectedSeats();
                render_table();
                render_price();
                render_type();
                render_typeResult();
            }
        }
        // 최종결제 금액 위에 그리는 함수
        function render_typeResult(){
            let result = '';
            console.log('3333');
            for(let i = 0; i<typeCnt.length; i++){
                if(typeCnt[i]==0){
                    result += '';
                    // result += `<span class="group">${type[i]} : ${typeCnt[i]}명 </span>`;
                }else{
                    result += `<span class="group">${type[i]} : ${typeCnt[i]}명 </span>`;
                }
                
            }

            typeAmount.innerHTML = result;
        }


        render_type();
        render_table();
        movieInfo();
        render_selectedSeats();
        render_price();
        render_typeResult();
