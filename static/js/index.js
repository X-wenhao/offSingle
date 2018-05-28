var indexNum
$(document).ready(function(){
    new Image().src = "../../static/pic/first_page_house.png" 
    new Image().src = "../../static/pic/game_page_machine.png"
    $.ajax({
    	url: '/api/V1.1/predict/get_num',
    	type: 'GET',
    	dataType: 'json'
    })
    .done(function(data) {
    	console.log(data.number)
    // 	结果页面的序号
     	$('.result-page-index span')[0].innerHTML = data.number//改成data.number
		changeIndex()
    	setTimeout(function() {
	    	$('.loading-page')[0].style.display = 'none'
	    	$('.first-page')[0].style.display = 'block'
	    	$('.first-page-heart-container').addClass('bounceInDown animated')
	    	$('.first-page-button').addClass('pulse animated2 infinite')
	    	$('.first-page-info').addClass('bounceInUp animated1')
	    }, 2800)
	    indexNum = data.number.toString()
	    if (!indexNum) {
	    	indexNum = '1'
	    }
	    explain = ['第' + indexNum + '号有缘人，欢迎来到月老我的脱单工作室~我今日工作繁忙、在外出差，不过不用担心，有此灵物指引你，领取到合适的对象~', 
			   '有缘人，“姻缘”一词精髓就在于一个“缘”，接下来，随着心念开启摇号，摇出的即是与你最有缘之人。', 
			   '有缘人，你已经拿到了对象领取凭条，但“缘”字玄妙多变，若是你已有了心上人却又有所顾虑，不如让月老我帮你，将你的心事写成信函秘密传给他TA吧。']
    })
    .fail(function() {
    	console.log("error")
    })
})



// 提交信息页面的内容
var memberId
var memberName, memberSex = '男', memberAge
// 摇杆的状态
var stickTag = 0
// 摇号操作
var [i1, i2, i3, i4] = [0, 0, 0, 0]
var state1, state2, state3, state4
// 摇号标志，只能摇一次
var gameTag = 0
// 动画页面渲染的文字
var explain = ['第' + indexNum + '号有缘人，欢迎来到月老我的脱单工作室~我今日工作繁忙、在外出差，不过不用担心，有此灵物指引你，领取到合适的对象~', 
			   '有缘人，“姻缘”一词精髓就在于一个“缘”，接下来，随着心念开启摇号，摇出的即是与你最有缘之人。', 
			   '有缘人，你已经拿到了对象领取凭条，但“缘”字玄妙多变，若是你已有了心上人却又有所顾虑，不如让月老我帮你，将你的心事写成信函秘密传给他TA吧。']
var next = ['点击下一步开始填写信息', '点击下一步开始摇号', '点击下一步开始编辑告白密函']
var renderTag = 0
var tin     //打字机的计时器
// 动画页面的打字机效果
var typewriter = function (explain, next) {
    let index = 0
    $('.computer-top-explain')[0].innerHTML = ''
    tin = setInterval(function () {
        $('.computer-top-explain')[0].innerHTML += explain.charAt(index)
        if (++ index == explain.length) {
            clearInterval(tin)
            index = 0
            $('.computer-top-next')[0].innerHTML = ''
            tin = setInterval(function () {
                $('.computer-top-next')[0].innerHTML += next.charAt(index)
                if (++ index == next.length) {
                    clearInterval(tin)
                }
            }, 150)
        }
    }, 150)
}
var leaveTransitionPage = function () {
	$('.transition-page')[0].style.display = 'none'
	$('.computer-top-explain')[0].innerHTML = ''
	$('.computer-top-next')[0].innerHTML = ''
	$('.transition-page-computer').removeClass('bounceInLeft animated')
	clearInterval(tin)
}
var leaveInfoPage = function () {
	$('.info-page')[0].style.display = 'none'
	$('.info-page-alert-container')[0].style.display = 'none'
	$('.info-page-container').removeClass('bounceInDown animated')
	// 清除表单里面的信息
	$('.info-page-name input')[0].value = ''
	$('.info-page-age input')[0].value = ''
	$('.info-page-name div')[0].className = 'info-page-bottomline'
    $('.info-page-age div')[0].className = 'info-page-bottomline'
    $(".radio-btn").parent().parent().find('input:radio').attr('checked', false);
    $(".radio-btn").parent().parent().find(".radio-btn").removeClass('checkedRadio');
}
var startGame = function () {
    state1 = setInterval(function () {
      $('.num-line1')[i1].style.transform = 'translateY(1.4rem)'
      $('.number-block1')[0].insertAdjacentHTML('beforeend', '<div class="num-line1">' + i1 % 10 + '</div>')
      i1 ++
    }, 180)
    state2 = setInterval(function () {
      $('.num-line2')[i2].style.transform = 'translateY(1.4rem)'
      $('.number-block2')[0].insertAdjacentHTML('beforeend', '<div class="num-line2">' + i2 % 10 + '</div>')
      i2 ++
      i2 = i2 % $('.num-line2').length
    }, 150)
    state3 = setInterval(function () {
      $('.num-line3')[i3].style.transform = 'translateY(1.4rem)'
      $('.number-block3')[0].insertAdjacentHTML('beforeend', '<div class="num-line3">' + i3 % 10 + '</div>')
      i3 ++
      i3 = i3 % $('.num-line3').length
    }, 250)
    state4 = setInterval(function () {
      $('.num-line4')[i4].style.transform = 'translateY(1.4rem)'
      $('.number-block4')[0].insertAdjacentHTML('beforeend', '<div class="num-line4">' + i4 % 10 + '</div>')
      i4 ++
      i4 = i4 % $('.num-line4').length
    }, 220)
}
// 首页的跳转按钮
$('.first-page-button')[0].addEventListener('click', function () {
	$('.first-page')[0].style.display = 'none'
	$('.transition-page')[0].style.display = 'block'
	$('.transition-page-computer').addClass('animated bounceInLeft')
	renderTag = 0
	typewriter(explain[0], next[0])
})
$('.info-page-back')[0].addEventListener('click', function () {
	$('.first-page')[0].style.display = 'block'
	leaveInfoPage()
})
// 动画页面的翻页
$('.guideBar-last')[0].addEventListener('click', function () {
	if (renderTag == 0) {
		$('.first-page')[0].style.display = 'block'
	} else if (renderTag == 1) {
		$('.info-page')[0].style.display = 'block'
		$('.info-page-container').addClass('bounceInDown animated')
	} else {
		$('.result-page')[0].style.display = 'block'
	}
	leaveTransitionPage()
})
$('.guideBar-next')[0].addEventListener('click', function () {
	leaveTransitionPage()
	if (renderTag == 0) {
		$('.info-page')[0].style.display = 'block'
		$('.info-page-container').addClass('bounceInDown animated')
	} else if (renderTag == 1) {
		$('.game-page')[0].style.display = 'block'
	} else {
		$('.letter-page')[0].style.display = 'block'
	}
})
// 性别选择动画
$('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>')
$(".radio-btn").on('click', function (e) {
    var _this = $(this),
        block = _this.parent().parent()
    console.log(e.target.firstChild.value || e.target.firstChild.firstChild.value)
    memberSex = e.target.firstChild.value || e.target.firstChild.firstChild.value
    block.find('input:radio').attr('checked', false)
    block.find(".radio-btn").removeClass('checkedRadio')
    _this.addClass('checkedRadio')
    _this.find('input:radio').attr('checked', true)
})
var getAge = function (con) {
	let age = parseInt(con.replace(/[^0-9]/ig,""))
	if (!con.match('-')) {
		return age
	} else {
		return parseInt('-' + age)
	}
}
// 提交信息填写页面的内容
$('.info-page-submit')[0].addEventListener('click', function () {
	memberName = $('.info-page-name input')[0].value
	memberAge = getAge($('.info-page-age input')[0].value)
	console.log(memberName, memberAge, memberSex)
	if (memberName.length > 7) {
		$('.info-message')[0].innerHTML = '姓名最多7个字哦！'
		$('.info-page-alert-container')[0].style.display = 'block'
	}
	if (memberAge > 105 || memberAge < 0 || !memberAge) {
		$('.info-message')[0].innerHTML = '请填写真实年龄！'
		$('.info-page-alert-container')[0].style.display = 'block'
	} else if (!memberName || !memberAge) {
		$('.info-message')[0].innerHTML = '请填写完整信息！'
		$('.info-page-alert-container')[0].style.display = 'block'
	} else {
		leaveInfoPage()
		$('.transition-page')[0].style.display = 'block'
		$('.transition-page-computer').addClass('bounceInLeft animated')
		renderTag = 1
		typewriter(explain[1], next[1])
	}
})
$('.info-sure')[0].addEventListener('click', function () {
	$('.info-page-alert-container')[0].style.display = 'none'
})
$('.info-page-alert-container')[0].addEventListener('click', function () {
	console.log(1)
})

// 信息填写动画
$('.info-page-name input')[0].addEventListener('focus', function () {
    $('.info-page-name div')[0].className = 'active0'
})
$('.info-page-age input')[0].addEventListener('focus', function () {
    $('.info-page-age div')[0].className = 'active2'
})

// 规范访问人员数量
var changeIndex = function () {
    let length = 5 - $('.result-page-index span')[0].innerHTML.length
    console.log(length)
    for (let i = 0; i < length; i ++) {
        $('.result-page-index span')[0].innerHTML = '0' + $('.result-page-index span')[0].innerHTML
    }
}
// 摇号的开始和暂停
$('.game-page-stick img')[1].addEventListener('click', function () {
	if (gameTag == 0) {
		if (stickTag == 0) {
			stickTag ++
			stickTag = stickTag % 2
			$('.game-page-stick img')[1].style.transform = 'perspective(1200px) rotateX(180deg)'
			startGame()
		} else {
			stickTag ++
			stickTag = stickTag % 2
			$('.game-page-stick img')[1].style.transform = 'perspective(1200px) rotateX(0deg)'
			var promise = new Promise(function (resolve, reject) {
				clearInterval(state1)
				clearInterval(state2)
				clearInterval(state3)
				clearInterval(state4)
				resolve('success')
			})
			promise.then(function(data) {
				console.log(data)
				i1 = (i1 + 1) % 10, i2 = (i2 + 1) % 10, i3 = (i3 + 1) % 10, i4 = (i4 + 1) % 10
				console.log(i1,i2,i3,i4)
				setTimeout(function () {
					$('.number-show1')[0].innerHTML = i1
					$('.number-show1')[0].style.transform = 'translateY(.6rem)'
					$('.number-block1').children().remove()
				}, 400)
				setTimeout(function () {
					$('.number-show2')[0].innerHTML = i2
					$('.number-show2')[0].style.transform = 'translateY(.6rem)'
					$('.number-block2').children().remove()
				}, 800)
				setTimeout(function () {
					$('.number-show3')[0].innerHTML = i3
					$('.number-show3')[0].style.transform = 'translateY(.6rem)'
					$('.number-block3').children().remove()
				}, 1200)
				setTimeout(function () {
					$('.number-show4')[0].innerHTML = i4
					$('.number-show4')[0].style.transform = 'translateY(.6rem)'
					$('.number-block4').children().remove()
					$('.gameBar-last')[0].style.display = 'block'
					$('.gameBar-next')[0].style.display = 'block'
				}, 1600)
				gameTag = 1
			})
		}	
	}	else {
		$('.game-page-guide')[0].innerHTML = '摇号只能进行一次！'
	}
})
$('.gameBar-last')[0].addEventListener('click', function () {
	$('.info-page')[0].style.display = 'block'
	$('.info-page-container').addClass('bounceInDown animated')
	$('.game-page')[0].style.display = 'none'
})
$('.gameBar-next')[0].addEventListener('click', function () {
	$('.game-page')[0].style.display = 'none'
	$('.loading-page')[0].style.display = 'block'
	console.log(i1, i2, i3, i4)
	$.ajax({
		url: '/api/V1.1/predict/pre_result?name=' + memberName + '&gender=' + memberSex + '&age=' + memberAge,
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		console.log(data)
		$('.result-page-name span')[0].innerHTML = memberName
		$('.result-page-sex span')[0].innerHTML = memberSex
		$('.result-page-age span')[0].innerHTML = memberAge
		$('.result-page-number span')[0].innerHTML = i1.toString() + i2 + i3 + i4
		$('.result-page-time span')[0].innerHTML = data.time + '年'
		$('.result-page-location span')[0].innerHTML = data.location
		$('.result-page-other .other-right-block')[0].innerHTML = data.person
	})
	.fail(function() {
		console.log("error")
	})
	.success(function () {
		$('.loading-page')[0].style.display = 'none'
		$('.result-page')[0].style.display = 'block'
		html2canvas($('.result-page-screenshot')[0], {
		  onrendered: function(canvas) {
			var dataURL = canvas.toDataURL("image/png")
			$('.result-page-screenshot').children().remove()
			$('.result-page-screenshot').html('<img class="img1"/>')
			$('.result-page-screenshot img').attr('src', dataURL);
		  }
		})
	})
})
// 结果页面过渡到动画页面
$('.result-page-button')[0].addEventListener('click', function () {
	$('.result-page')[0].style.display = 'none'
	$('.transition-page')[0].style.display = 'block'
	$('.transition-page-computer').addClass('bounceInLeft animated')
	typewriter(explain[2], next[2])
	renderTag = 2
})
$('.letter-page-back')[0].addEventListener('click', function () {
	leaveLetterPage()
})
var leaveLetterPage = function () {
	if ($('.letter-page-email-write input')[0].value == '' && $('.letter-page-content-write')[0].value == '') {
		$('.result-page')[0].style.display = 'block'
		$('.letter-page')[0].style.display  = 'none'
	}	else {
		$('.letter-page-alert-container')[0].style.display = 'block'
		$('.leave-alert')[0].style.display = 'block'
		$('.confirm-alert')[0].style.display = 'none'
	}
}
$('.leave-sure')[0].addEventListener('click', function () {
	closeLetterAlert()
	$('.result-page')[0].style.display = 'block'
	$('.letter-page')[0].style.display  = 'none'
	$('.letter-page-email-write input')[0].value = ''
	$('.letter-page-content-write')[0].value = ''
})
$('.leave-cancel')[0].addEventListener('click', function () {
	closeLetterAlert()
})
function closeLetterAlert() {
	$('.letter-page-alert-container')[0].style.display = 'none'
	$('.leave-alert')[0].style.display = 'none'
	$('.confirm-alert')[0].style.display = 'none'
}
function confirmSure(index) {
	$('.letter-page-alert-container')[0].style.display = 'block'
	$('.leave-alert')[0].style.display = 'none'
	$('.confirm-alert')[0].style.display = 'block'
	if (index == 0) {
		$('.confirm-message')[0].innerHTML = '您输入的邮箱有误，请检查！'
	}	else if (index == 1) {
		$('.confirm-message')[0].innerHTML = '你的告白密函投递成功！'
	} else {
		$('.confirm-message')[0].innerHTML = '投递失败，请重新投递！'
	}
}
function isEmail(str){ 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}
$('.letter-page-submit-button')[0].addEventListener('click', function () {
	if (isEmail($('.letter-page-email-write input')[0].value)) {
		$.ajax({
			url: '/api/V1.1/mail',
			type: 'POST',
			dataType: 'json',
		contentType: "application/json; charset=utf-8",	
         data: JSON.stringify({address: $('.letter-page-email-write input')[0].value, content: $('.letter-page-content-write')[0].value}),
		})
		.done(function(data) {
			if (!data.result) {
				confirmSure(2)
			} else {
				confirmSure(1)
			}
		})
		.fail(function() {
			console.log("error")
		})
	}	else {
		confirmSure(0)
	}
})
$('.confirm-sure')[0].addEventListener('click', function () {
	closeLetterAlert()
})
