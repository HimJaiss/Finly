const AuthLayout = ({ children }) => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      {children}
    </div>
  );
};

export default AuthLayout;