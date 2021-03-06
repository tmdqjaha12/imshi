console.clear();

//모바일 사이드바

function MobileSideBar__init() {
	$('.mobile-top-bar .btn-toggle-mobile-side-bar').click(function() {
		var $this = $(this);

		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$('.mobile-side-bar').removeClass('active');
		} else {
			$this.addClass('active')
			$('.mobile-side-bar').addClass('active');
		}
	});
}

$(function() {
	MobileSideBar__init();
});

// 댓글 버튼

function modifyArticleReply__init() {
	$('.modify-reply-button > button').click(function() {
		var $this = $(this);

		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$('.modify-reply-box').removeClass('active');
		} else {
			$this.addClass('active')
			$('.modify-reply-box').addClass('active');
		}
	});
}

$(function() {
	modifyArticleReply__init();
});

// 댓글 폼 시작

var replyFormSubmitted = false;

function submitReplytForm(form){
	if (replyFormSubmitted) {
		alert('처리 중입니다.');
		return
	}
	
	form.body.value = form.body.value.trim();
	if (form.body.value.length == 0){
		alert('댓글을 입력해주세요.');
		form.body.focus();
		
		return;
	}
	
	form.submit();
	replyFormSubmitted = true;
}

////댓글 수정 폼 ......

var modifyReplyFormSubmitted = false;

function submitModifyReplyForm(form){
	if (modifyReplyFormSubmitted) {
		alert('처리 중입니다.');
		return
	}
	
	form.body.value = form.body.value.trim();
	if (form.replyBody.value.length == 0){
		alert('댓글을 입력해주세요.');
		form.body.focus();
		
		return;
	}
	
	form.submit();
	modifyReplyFormSubmitted = true;
}

// 댓글 폼 시작 끝

// 글쓰기 폼 시작

var writeFormSubmitted = false;

function submitWriteForm(form) {
	if (writeFormSubmitted) {
		alert('처리 중입니다.');
		return;
	}

	form.title.value = form.title.value.trim();
	if (form.title.value.length == 0) {
		alert('제목을 입력해주세요.');
		form.title.focus();

		return;
	}

	if (form.title.value.indexOf(' ') != -1) {
		alert('제목을 영문소문자와 숫자의 조합으로 입력해주세요.')
		form.title.focus();

		return;
	}

	form.body.value = form.body.value.trim();
	if (form.body.value.length == 0) {
		alert('내용을 입력해주세요.');
		form.body.focus();

		return;
	}

	if (form.body.value.indexOf(' ') != -1) {
		alert('내용을 영문소문자와 숫자의 조합으로 입력해주세요.')
		form.body.focus();

		return;
	}

	form.submit();
	writeFormSubmitted = true;
}
// 글쓰기 폼 끝

// 로그인 폼 시작

var loginFormSubmitted = false;

function submitLoginForm(form) {
	if (loginFormSubmitted) {
		alert('처리 중입니다.');
		return;
	}

	form.loginId.value = form.loginId.value.trim();
	if (form.loginId.value.length == 0) {
		alert('아이디를 입력해주세요.');
		form.loginId.focus();

		return;
	}

	if (form.loginId.value.indexOf(' ') != -1) {
		alert('아이디를 영문소문자와 숫자의 조합으로 입력해주세요.')
		form.loginId.focus();

		return;
	}

	form.loginPw.value = form.loginPw.value.trim();
	if (form.loginPw.value.length == 0) {
		alert('비밀번호를 입력해주세요.');
		form.loginPw.focus();

		return;
	}

	if (form.loginPw.value.indexOf(' ') != -1) {
		alert('비밀번호를 영문소문자와 숫자의 조합으로 입력해주세요.')
		form.loginPw.focus();

		return;
	}

	form.loginPwReal.value = sha256(form.loginPw.value);
	form.loginPw.value = '';

	form.submit();
	loginFormSubmitted = true;
}
// 로그인 폼 끝

// 회원가입 폼 시작

var joinFormSubmitted = false;

function submitJoinForm(form) {
	if (joinFormSubmitted) {
		alert('처리 중입니다.');
		return;	
	}

	form.loginId.value = form.loginId.value.trim();
	if (form.loginId.value.length == 0) {
		alert('아이디를 입력해주세요.');
		form.loginId.focus();

		return;
	}

	if (form.loginId.value.indexOf(' ') != -1) {
		alert('아이디를 영문소문자와 숫자의 조합으로 입력해주세요.')
		form.loginId.focus();

		return;
	}

	form.name.value = form.name.value.trim();
	if (form.name.value.length == 0) {
		alert('이름을 입력해주세요.');
		form.name.focus();

		return;
	}

	form.nickname.value = form.nickname.value.trim();
	if (form.nickname.value.length == 0) {
		alert('닉네임을 입력해주세요.');
		form.nickname.focus();

		return;
	}

	form.loginPw.value = form.loginPw.value.trim();
	if (form.loginPw.value.length == 0) {
		alert('비밀번호를 입력해주세요.');
		form.loginPw.focus();

		return;
	}

	form.loginPwConfirm.value = form.loginPwConfirm.value.trim();
	if (form.loginPw.value != form.loginPwConfirm.value) {
		alert('비밀번호 확인을 정확히 입력해주세요.');
		form.loginPwConfirm.focus();

		return;
	}

	form.loginPwReal.value = sha256(form.loginPw.value);
	form.loginPw.value = '';

	form.loginPwConfirm.value = form.loginPw.value;

	form.submit();
	joinFormSubmitted = true;
}

// 회원가입 폼 끝

// 유튜브 플러그인 시작
function youtubePlugin() {
	toastui.Editor.codeBlockManager.setReplacer("youtube", function(youtubeId) {
		// Indentify multiple code blocks
		const wrapperId = "yt" + Math.random().toString(36).substr(2, 10);

		// Avoid sanitizing iframe tag
		setTimeout(renderYoutube.bind(null, wrapperId, youtubeId), 0);

		return '<div id="' + wrapperId + '"></div>';
	});
}

function renderYoutube(wrapperId, youtubeId) {
	const el = document.querySelector('#' + wrapperId);

	var urlParams = getUrlParams(youtubeId);

	var width = '100%';
	var height = '100%';

	if (urlParams.width) {
		width = urlParams.width;
	}

	if (urlParams.height) {
		height = urlParams.height;
	}

	var maxWidth = 500;

	if (urlParams['max-width']) {
		maxWidth = urlParams['max-width'];
	}

	var ratio = '16-9';

	if (urlParams['ratio']) {
		ratio = urlParams['ratio'];
	}

	var marginLeft = 'auto';

	if (urlParams['margin-left']) {
		marginLeft = urlParams['margin-left'];
	}

	var marginRight = 'auto';

	if (urlParams['margin-right']) {
		marginRight = urlParams['margin-right'];
	}

	if (youtubeId.indexOf('?') !== -1) {
		var pos = youtubeId.indexOf('?');
		youtubeId = youtubeId.substr(0, pos);
	}

	el.innerHTML = '<div style="max-width:'
			+ maxWidth
			+ 'px; margin-left:'
			+ marginLeft
			+ '; margin-right:'
			+ marginRight
			+ ';" class="ratio-'
			+ ratio
			+ ' relative"><iframe class="abs-full" width="'
			+ width
			+ '" height="'
			+ height
			+ '" src="https://www.youtube.com/embed/'
			+ youtubeId
			+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
}
// 유튜브 플러그인 끝

// repl 플러그인 시작
function replPlugin() {
	toastui.Editor.codeBlockManager.setReplacer("repl", function(replUrl) {
		var postSharp = "";
		if (replUrl.indexOf('#') !== -1) {
			var pos = replUrl.indexOf('#');
			postSharp = replUrl.substr(pos);
			replUrl = replUrl.substr(0, pos);
		}

		if (replUrl.indexOf('?') === -1) {
			replUrl += "?dummy=1";
		}

		replUrl += "&lite=true";
		replUrl += postSharp;

		// Indentify multiple code blocks
		const wrapperId = `yt${Math.random().toString(36).substr(2, 10)}`;

		// Avoid sanitizing iframe tag
		setTimeout(renderRepl.bind(null, wrapperId, replUrl), 0);

		return "<div id=\"" + wrapperId + "\"></div>";
	});
}

function renderRepl(wrapperId, replUrl) {
	const el = document.querySelector(`#${wrapperId}`);

	var urlParams = getUrlParams(replUrl);

	var height = 400;

	if (urlParams.height) {
		height = urlParams.height;
	}

	el.innerHTML = '<iframe height="'
			+ height
			+ 'px" width="100%" src="'
			+ replUrl
			+ '" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>';
}
// repl 플러그인 끝

// codepen 플러그인 시작
function codepenPlugin() {
	toastui.Editor.codeBlockManager
			.setReplacer(
					"codepen",
					function(codepenUrl) {
						// Indentify multiple code blocks
						const wrapperId = `yt${Math.random().toString(36).substr(2, 10)}`;

						// Avoid sanitizing iframe tag
						setTimeout(renderCodepen.bind(null, wrapperId,
								codepenUrl), 0);

						return '<div id="' + wrapperId + '"></div>';
					});
}

function renderCodepen(wrapperId, codepenUrl) {
	const el = document.querySelector(`#${wrapperId}`);

	var urlParams = getUrlParams(codepenUrl);

	var height = 400;

	if (urlParams.height) {
		height = urlParams.height;
	}

	var width = '100%';

	if (urlParams.width) {
		width = urlParams.width;
	}

	if (!isNaN(width)) {
		width += 'px';
	}

	if (codepenUrl.indexOf('#') !== -1) {
		var pos = codepenUrl.indexOf('#');
		codepenUrl = codepenUrl.substr(0, pos);
	}

	el.innerHTML = '<iframe height="'
			+ height
			+ '" style="width: '
			+ width
			+ ';" scrolling="no" title="" src="'
			+ codepenUrl
			+ '" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>';
}
// repl 플러그인 끝

// lib 시작
String.prototype.replaceAll = function(org, dest) {
	return this.split(org).join(dest);
}

function getUrlParams(url) {
	url = url.trim();
	url = url.replaceAll('&amp;', '&');
	if (url.indexOf('#') !== -1) {
		var pos = url.indexOf('#');
		url = url.substr(0, pos);
	}

	var params = {};

	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
		params[key] = value;
	});
	return params;
}
// lib 끝

var editor1 = new toastui.Editor({
	el : document.querySelector("#editor1"),
	height : "600px",
	initialEditType : "markdown",
	previewStyle : "vertical",
	initialValue : "# 안녕",
	plugins : [ toastui.Editor.plugin.codeSyntaxHighlight,
			youtubePlugin, replPlugin, codepenPlugin ]
});

function submitWriteForm(form) {
	var source = editor1.getMarkdown().trim();
	if (source.length == 0) {
		alert('내용을 입력해주세요.');
		editor1.focus();
		return;
	}
	form.body.value = source;
	form.submit();
}

