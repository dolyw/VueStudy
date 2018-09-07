package com.wang.service.impl;

import com.wang.entity.MyUserDetails;
import com.wang.entity.User;
import com.wang.mapper.UserMapper;
import com.wang.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Wang926454
 * @date 2018/8/9 15:45
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements IUserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user =  new User();
        user.setAccount(s);
        user = userMapper.selectOne(user);
        if(user == null){
            throw new UsernameNotFoundException("用户不存在");
        } else{
            return new MyUserDetails(user);
        }
    }
}
