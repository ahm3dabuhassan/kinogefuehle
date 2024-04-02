<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #parent {
            width: 60%;
            height: 40vh;
            padding: 10px;
        }
        #parent > a {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: repeat(6, 1fr);
            width: 100%;
            height: 40vh;
            padding: 10px;
            text-decoration: none;
        }
        #parent > a > div:nth-of-type(1) {
            grid-column: 1/4; 
            background-color: blue;
            opacity: 0.5;
        }
        #parent > a > div:nth-of-type(1) > div {
            width: 80%;
            height: 30vh;
            float: right;
            opacity: 0.5; 
            background-color: white;
        }
        #parent > a > div:nth-of-type(1) > div > div{
            width: 55%;
            height: 18vh;
            opacity: 0.5; 
            float: right;
            border-radius: 0px 0px 0px 10px;
            background-color: blue;
        }
        #parent > a > div:nth-of-type(2) {
            grid-column: 7/10; 
            grid-row: 1/3;
            position: relative;
            z-index: 0;
            background-color: blue;
            opacity: 0.5;
        }
        #parent > a > div:nth-of-type(2) > div {
            width: 80%;
            height: 30vh;
            opacity: 0.5; 
            background-color: white;
        }
        #parent > a > div:nth-of-type(2) > div > div{
            width: 55%;
            height: 12.3vh;
            float: right;
            border-radius: 0px 0px 0px 10px;
            opacity: 0.5; 
            background-color: blue;
        }
        #poster {
            grid-column: 4/7;
        }
        a > p {
            grid-column: 7/10;
            grid-row: 1/2;
            position: relative;
            z-index: 1;
            margin-left: 10px;
            font-size: 40px;
            font-family: futura;
            color: #252525;
        }

    </style>
</head>
<body>
<div id='parent'>
    <a href=''>
        <div>
            <div>
            <div>
            </div>
            </div>
        </div>
           <img id='poster' width='100%' height="330vh" src='../poster/Tokyo Story.jpg'>
        <div><div><div></div></div></div>
        <p>Tokyo Story.</p>
    </a>
</div>
<div id='info'>Hello, aus dieser Auswhahl kannst du einen Film clicken, um zu erfahren, was jemand darüber meint.</div>
</body>
</html>