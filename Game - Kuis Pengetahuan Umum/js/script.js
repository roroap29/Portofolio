//Button-button yang diperlukan
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


// Tombol play game
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

// Tombol exit game
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

// Tombol continue
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //menyembunyikan game
    quiz_box.classList.add("activeQuiz"); //menampilkan game
    showQuetions(0); //memanggil fungsi untuk menampilkan pertanyaan
    queCounter(1); //meneruskan 1 parameter ke penghitung soal
    startTimer(15); //memanggil penghitung waktu (angka)
    startTimerLine(0); //memanggil penghitung waktu (garis)
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Tombol restart game
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //menampilkan pertanyaan 
    result_box.classList.remove("activeResult"); //menyembunyikan hasil game
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //memanggil fungsi untuk menampilkan pertanyaan
    queCounter(que_numb); //meneruskan nilai penghitung soal 
    clearInterval(counter); //menghapus penghitung waktu (angka)
    clearInterval(counterLine); //menghapus penghitung waktu (garis)
    startTimer(timeValue); //memanggil fungsi penghitung waktu (angka)
    startTimerLine(widthValue); //memanggil fungsi penghitung waktu (garis)
    timeText.textContent = "Time Left"; //mengubah time text menjadi time left
    next_btn.classList.remove("show"); //menyembunyikan tombol next
}

//Tombol quit game
quit_quiz.onclick = ()=>{
    window.location.reload(); //memuat ulang halaman awal game
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

//Tombol next
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //jika jumlah pertanyaan kurang dari total panjang pertanyaan
        que_count++; //menambah nilai que_count
        que_numb++; //menambah nilai que_numb
        showQuetions(que_count); //memanggil nilai untuk menampilkan pertanyaan 
        queCounter(que_numb); //meneruskan nilai penghitung soal 
        clearInterval(counter); //menghapus penghitung waktu (angka)
        clearInterval(counterLine); //menghapus penghitung waktu (garis)
        startTimer(timeValue); //memanggil fungsi penghitung waktu (angka)
        startTimerLine(widthValue); //memanggil fungsi penghitung waktu (garis)
        timeText.textContent = "Time Left"; //mengubah time text menjadi time left
        next_btn.classList.remove("show"); //menyembunyikan tombol next
    }else{
        clearInterval(counter); //menghapus penghitung (angka)
        clearInterval(counterLine); //menghapus penghitung (garis)
        showResult(); //menampilkan hasil game
    }
}

//mendapatkan pertanyaan dan opsi dari array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //membuat tag span dan div baru untuk pertanyaan dan opsi dan meneruskan nilai menggunakan indeks array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //menambahkan tag rentang baru di dalam que_tag
    option_list.innerHTML = option_tag; //menambahkan tag div baru di dalam option_tag
    
    const option = option_list.querySelectorAll(".option");

    //atur atribut onclick ke semua opsi yang tersedia
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
//membuat tag div baru untuk icon
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//jika pengguna mengklik opsi
function optionSelected(answer){
    clearInterval(counter); //menghapus penghitung (angka)
    clearInterval(counterLine); //menghapus penghitung (garis)
    let userAns = answer.textContent; //mendapatkan opsi yang dipilih pengguna
    let correcAns = questions[que_count].answer; //mendapatkan jawaban yang benar dari array
    const allOptions = option_list.children.length; //mendapatkan semua item pilihan
    
    if(userAns == correcAns){ //jika opsi yang dipilih pengguna sama dengan jawaban yang benar dari array
        userScore += 1; //menambah skor nilai dengan 1
        answer.classList.add("correct"); //menambahkan warna hijau untuk mengoreksi opsi yang dipilih
        answer.insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang untuk mengoreksi opsi yang dipilih
        console.log("Jawaban Benar");
        console.log("Jawabanmu yang benar = " + userScore);
    }else{
        answer.classList.add("incorrect"); //menambahkan warna merah untuk mengoreksi opsi yang dipilih
        answer.insertAdjacentHTML("beforeend", crossIconTag); //menambahkan ikon silang untuk mengoreksi opsi yang dipilih
        console.log("Jawaban Salah");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //jika ada opsi yang cocok dengan jawaban array
                option_list.children[i].setAttribute("class", "option correct"); //menambahkan warna hijau ke opsi yang sesauai
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang ke opsi yang sesuai
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //setelah pengguna memilih opsi, lalu nonaktifkan semua opsi
    }
    next_btn.classList.add("show"); //tampilkan tombol berikutnya jika pengguna memilih opsi apa pun
}

function showResult(){
    info_box.classList.remove("activeInfo"); //menyembunyikan kota informasi
    quiz_box.classList.remove("activeQuiz"); //menyembunyikan pertanyaan
    result_box.classList.add("activeResult"); //menampilkan hasil game
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ //Jika score yang didapatkan lebih dari 7
        //membuat tag rentang baru dan meneruskan nomor skor pengguna dan total nomor pertanyaan
        let scoreTag = '<span>Selamat! 🎉, Kamu mendapat <p>'+ userScore +'</p> dari <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //menambahkan tag rentang baru di dalam score_Text
    }
    else if(userScore > 4){ //Jika score yang didapatkan lebih dari 4 
        let scoreTag = '<span>Wow! 😎, Kamu mendapat <p>'+ userScore +'</p> dari <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ //jika pengguna mencetak kurang dari 4
        let scoreTag = '<span>Maaf 😐, Kamu hanya mendapat <p>'+ userScore +'</p> dari <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //mengubah nilai timeCount dengan nilai waktu
        time--; //mengurangi nilai waktu
        if(time < 9){ //jika timer kurang dari 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //tambahkan 0 sebelum nilai waktu
        }
        if(time < 0){ //jika timer kurang dari 0
            clearInterval(counter); //menghapus penghitung
            timeText.textContent = "Time Off"; //mengubah teks waktu menjadi Time Off (waktu habis)
            const allOptions = option_list.children.length; //mendapatkan semua item pilihan
            let correcAns = questions[que_count].answer; //mendapatkan jawaban yang benar dari array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //jika ada opsi yang cocok dengan jawaban array
                    option_list.children[i].setAttribute("class", "option correct"); //menambahkan warna hijau ke opsi yang cocok
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang ke opsi yang cocok
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //setelah pengguna memilih opsi, lalu nonaktifkan semua opsi
            }
            next_btn.classList.add("show"); //tampilkan tombol berikutnya jika pengguna memilih opsi apa pun
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //meningkatkan nilai waktu dengan 1
        time_line.style.width = time + "px"; //meningkatkan lebar garis waktu dengan px berdasarkan nilai waktu
        if(time > 549){ //jika nilai waktu lebih besar dari 549
            clearInterval(counterLine); //hapus counterLine
        }
    }
}

function queCounter(index){
    //membuat tag rentang baru dan meneruskan nomor pertanyaan dan total pertanyaan
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //menambahkan tag rentang baru di dalam bottom_ques_counter
}