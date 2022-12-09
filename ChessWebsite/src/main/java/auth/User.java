package auth;

public class User {
	private String firstName;
	private String userName;
	private String lastName;
	private String password;
	private String emailAddress;
	private boolean validUser;
	
	
	
	
	public User(String firstName, String lastName,String userName, String password, String emailAddress ) {
		if (userName != null && password != null ) setValidUser(true);
		setFirstName(firstName);
		setLastName(lastName);
		setPassword(password);
		setEmailAddress(emailAddress);
		setUserName(userName);
		
	}
	
	public User(String userName, String password) {
		setUserName(userName);
		setPassword(password);
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public boolean isValidUser() {
		return validUser;
	}

	public void setValidUser(boolean validUser) {
		this.validUser = validUser;
	}


	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", userName=" + userName + ", lastName=" + lastName + ", password="
				+ password + ", emailAddress=" + emailAddress + "]";
	}
	
}
