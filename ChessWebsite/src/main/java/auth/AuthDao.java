package auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AuthDao {
	String sql = "select * from Users where username = ? and pass = ?";
	String url = "jdbc:mysql://localhost:3306/kentest";
	
	//in production this will be stored in a hashed file
	String username = "root";
	String password = "";
	
	public boolean checkUserEmail(String username, String email) {
		sql = "select * from Users where username =? and email =?";
		return check(username, email);
	}
	
	//create user
	public boolean createUser(User user) {
		sql = "INSERT INTO users VALUES(?,?,?,?,?)";
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, username, password);
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1,  user.getUserName());
			st.setString(2,  user.getPassword());
			st.setString(3,  user.getFirstName());
			st.setString(4,  user.getLastName());
			st.setString(5,  user.getEmailAddress());
			
			
			st.executeUpdate();
			st.close();

			con.close();
			return true;
			}
		
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//check if username and password are in the database
	public boolean check(String uname, String pass) {
		try {
			System.out.println("start of check");
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, username, password);
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1,  uname);
			st.setString(2,  pass);
			ResultSet rs = st.executeQuery();
			System.out.println("executed query");
			if(rs.next()) {
				con.close();
				return true;
			}
		}
		
		catch (Exception e) {
			e.printStackTrace();
		}

		return false;
	}
}
