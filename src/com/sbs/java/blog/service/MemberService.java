package com.sbs.java.blog.service;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sbs.java.blog.dao.ArticleDao;
import com.sbs.java.blog.dao.MemberDao;
import com.sbs.java.blog.dto.Article;
import com.sbs.java.blog.dto.Member;

public class MemberService extends Service {
	private MemberDao memberDao;

	public MemberService(Connection dbConn, HttpServletRequest req, HttpServletResponse resp) {
		super(req, resp);
		memberDao = new MemberDao(dbConn, req, resp);
	}
	
	public boolean isJoinableLoginId(String loginId) {
		return memberDao.isJoinableLoginId(loginId);
	}

	public boolean isJoinableNickname(String nickname) {
		return memberDao.isJoinableNickname(nickname);
	}

	public boolean isJoinableEmail(String email) {
		return memberDao.isJoinableEmail(email);
	}

	public int join(String loginId, String loginPw, String name, String nickname, String email) {
		return memberDao.join(loginId, loginPw, name, nickname, email);
	}


	public Member login(String loginId, String loginPw) {
		return memberDao.login(loginId, loginPw);
	}

	public boolean getMemberCounts(String loginId, String loginPw) {
		return memberDao.getMemberCounts(loginId, loginPw);
	}

	public boolean getLoginIdFact(String loginId) {
		return memberDao.getLoginIdFact(loginId);
	}

	public boolean getNickNameFact(String nickname) {
		return memberDao.getNickNameFact(nickname);
	}

	public Member getMemberById(int id) {
		return memberDao.getMemberById(id);
	}
}
