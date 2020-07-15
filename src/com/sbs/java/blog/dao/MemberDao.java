package com.sbs.java.blog.dao;

import java.sql.Connection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sbs.java.blog.dto.Article;
import com.sbs.java.blog.dto.Member;
import com.sbs.java.blog.util.DBUtil;
import com.sbs.java.blog.util.SecSql;

public class MemberDao extends Dao {
	private Connection dbConn;
	private DBUtil dbUtil;

	public MemberDao(Connection dbConn, HttpServletRequest req, HttpServletResponse resp) {
		super(req, resp);
		this.dbConn = dbConn;
		dbUtil = new DBUtil(req, resp);
	}

	public int join(String loginId, String loginPw, String name, String nickname, String email) {
		SecSql sql = SecSql.from("INSERT INTO member");
		sql.append("SET regDate = NOW()");
		sql.append(", updateDate = NOW()");
		sql.append(", loginId = ?", loginId);
		sql.append(", loginPw = ?", loginPw);
		sql.append(", name = ?", name);
		sql.append(", nickname = ?", nickname);
		sql.append(", email = ?", email);
		return DBUtil.insert(dbConn, sql);
	}
	
	public boolean isJoinableLoginId(String loginId) {
		SecSql sql = SecSql.from("SELECT COUNT(*) AS cnt");
		sql.append("FROM `member`");
		sql.append("WHERE loginId = ?", loginId);
		return dbUtil.selectRowIntValue(dbConn, sql) == 0;
	}
	public boolean isJoinableNickname(String nickname) {
		SecSql sql = SecSql.from("SELECT COUNT(*) AS cnt");
		sql.append("FROM `member`");
		sql.append("WHERE nickname = ?", nickname);
		return dbUtil.selectRowIntValue(dbConn, sql) == 0;
	}
	
	public boolean isJoinableEmail(String email) {
		SecSql sql = SecSql.from("SELECT COUNT(*) AS cnt");
		sql.append("FROM `member`");
		sql.append("WHERE email = ?", email);
		return dbUtil.selectRowIntValue(dbConn, sql) == 0;
	}
	
	public int getMemberIdByLoginIdAndLoginPw(String loginId, String loginPw) {
		SecSql sql = SecSql.from("SELECT id");
		sql.append("FROM `member`");
		sql.append("WHERE loginId = ?", loginId);
		sql.append("AND loginPw = ?", loginPw);

		return dbUtil.selectRowIntValue(dbConn, sql);
	}
	
	public Member getMemberById(int id) {
		SecSql sql = SecSql.from("SELECT *");
		sql.append("FROM `member`");
		sql.append("WHERE id = ?", id);
		return new Member(dbUtil.selectRow(dbConn, sql));
	}

	public Member login(String loginId, String loginPw) {
		SecSql secSql = new SecSql();

		secSql.append("SELECT *");
		secSql.append("FROM member");
		secSql.append("WHERE 1");
		secSql.append("AND loginId = ?", loginId);
		secSql.append("AND loginPw = ?", loginPw);
//		
//		secSql.append("SELECT EXISTS (");
//		secSql.append("SELECT * FROM member");
//		secSql.append("WHERE loginId = ?", loginId);
//		secSql.append("AND loginPw = ?", loginPw);
//		secSql.append(")AS success");
		if (new Member(dbUtil.selectRow(dbConn, secSql)).getId() == 0) {
			return null;
		}

		return new Member(dbUtil.selectRow(dbConn, secSql));
	}

	public boolean getMemberCounts(String loginId, String loginPw) {
		SecSql secSql = new SecSql();

		secSql.append("SELECT COUNT(*)");
		secSql.append("FROM member");
		secSql.append("WHERE loginId = ?", loginId);
		secSql.append("AND loginPw = ?", loginPw);

		return dbUtil.selectRowBooleanValue(dbConn, secSql);
	}
//loginId.replaceAll("<". "&lt;").replaceAll(">". "&gt;").replace("\r\n", "<br>">));

	public boolean getLoginIdFact(String loginId) {
		SecSql secSql = new SecSql();

		secSql.append("SELECT COUNT(*)");
		secSql.append("FROM member");
		secSql.append("WHERE loginId = ?", loginId);

		return dbUtil.selectRowBooleanValue(dbConn, secSql);
	}

	public boolean getNickNameFact(String nickname) {
		SecSql secSql = new SecSql();

		secSql.append("SELECT COUNT(*)");
		secSql.append("FROM member");
		secSql.append("WHERE nickname = ?", nickname);

		return dbUtil.selectRowBooleanValue(dbConn, secSql);
	}

}
