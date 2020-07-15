package com.sbs.java.blog.controller;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sbs.java.blog.dto.Member;
import com.sbs.java.blog.service.MemberService;

public class MemberController extends Controller {

	public MemberController(Connection dbConn, String actionMethodName, HttpServletRequest req,
			HttpServletResponse resp) {
		super(dbConn, actionMethodName, req, resp);
	}

	public void beforeAction() {
		super.beforeAction();
		// 이 메서드는 게시물 컨트롤러의 모든 액션이 실행되기 전에 실행된다.
		// 필요없다면 지워도 된다.
	}

	@Override
	public String doAction() {
		switch (actionMethodName) {
		case "join":
			return doActionJoin();
		case "doJoin":
			return doActionDoJoin();
		case "login":
			return doActionLogin();
		case "doLogin":
			return doActionDoLogin();
		case "doLogout":
			return doActionDoLogOut();
		}

		return "";
	}

	private String doActionDoLogOut() {
		session.removeAttribute("loginedMemberId");

		return "html:<script> alert('로그아웃 되었습니다.'); location.replace('../home/main'); </script>";
	}

	private String doActionLogin() {
		return "member/login.jsp";
	}

	private String doActionDoLogin() {
		String loginId = req.getParameter("loginId");
		String loginPw = req.getParameter("loginPwReal");

		if (memberSercive.getMemberCounts(loginId, loginPw) == false) {
			return "html:<script> alert('유효하지 않는 정보입니다.'); location.replace('login'); </script>";
		}

		Member member = memberSercive.login(loginId, loginPw);
		//////////////////////////////////////////////////////

		session.setAttribute("loginedMemberId", member.getId());

//		int loginedMemberId = 0;
//		if ( session.getAttribute("loginedMember")!=null){
//			Member member_ = (Member) session.getAttribute("loginedMember");
//			session.setAttribute("loginedMemberId", member_.getId());
//		    loginedMemberId = (int)session.getAttribute("loginedMemberId");
//		}

		return "html:<script> alert('로그인 완료'); location.replace('../home/main'); </script>";
	}

	private String doActionJoin() {
		return "member/join.jsp";
	}

	private String doActionDoJoin() {

		String loginId = req.getParameter("loginId");
		String loginPw = req.getParameter("loginPwReal");
		String name = req.getParameter("name");
		String nickname = req.getParameter("nickname");
		String email = req.getParameter("email");
		boolean isJoinableLoginId = memberSercive.isJoinableLoginId(loginId);
		if (isJoinableLoginId == false) {
			return String.format("html:<script> alert('%s(은)는 이미 사용중인 아이디 입니다.'); history.back(); </script>", loginId);
		}
		boolean isJoinableNickname = memberSercive.isJoinableNickname(nickname);
		if (isJoinableNickname == false) {
			return String.format("html:<script> alert('%s(은)는 이미 사용중인 닉네임 입니다.'); history.back(); </script>", nickname);
		}
		boolean isJoinableEmail = memberSercive.isJoinableEmail(email);
		if (isJoinableEmail == false) {
			return String.format("html:<script> alert('%s(은)는 이미 사용중인 이메일 입니다.'); history.back(); </script>", email);
		}
		memberSercive.join(loginId, loginPw, name, nickname, email);
		return String.format("html:<script> alert('%s님 환영합니다.'); location.replace('../home/main'); </script>", name);
	}

}
