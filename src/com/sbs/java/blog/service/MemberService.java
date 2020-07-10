package com.sbs.java.blog.service;

import java.sql.Connection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sbs.java.blog.dao.ArticleDao;
import com.sbs.java.blog.dao.MemberDao;
import com.sbs.java.blog.dto.Article;

public class MemberService extends Service {
	private MemberDao memberDao;

	public MemberService(Connection dbConn, HttpServletRequest req, HttpServletResponse resp) {
		super(req, resp);
		memberDao = new MemberDao(dbConn, req, resp);
	}

	public int join(String loginId, String name, String nickname, String loginPw) {
		return memberDao.join(loginId, name, nickname, loginPw);
	}

	public int login(String loginId, String loginPw) {
		return memberDao.login(loginId, loginPw);
	}
}