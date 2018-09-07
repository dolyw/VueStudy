package com.wang.controller;

import com.wang.entity.User;
import com.wang.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Wang926454
 * @date 2018/8/9 15:45
 */
@RestController
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    /**
     * 获取所有用户
     * @param 
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author Wang926454
     * @date 2018/8/9 16:11
     */
    @GetMapping("/user")
    public Map<String,Object> user(){
        List<User> users = userService.selectAll();
        Map map = new HashMap(16);
        map.put("code", "200");
        map.put("data", users);
        return map;
    }

    /**
     * 获取指定用户
     * @param id
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author Wang926454
     * @date 2018/8/9 16:11
     */
    @GetMapping("/user/{id}")
    public Map<String,Object> findById(@PathVariable("id") Integer id){
        User user = userService.selectByPrimaryKey(id);
        Map map = new HashMap(16);
        map.put("code", "200");
        map.put("data", user);
        return map;
    }

    /**
     * 新增用户
     * @param user
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author Wang926454
     * @date 2018/8/9 16:11
     */
    @PostMapping("/user")
    public Map<String,Object> add(@RequestBody User user){
        user.setRegtime(new Date());
        int count = userService.insert(user);
        Map map = new HashMap(16);
        map.put("code", "200");
        map.put("count", count);
        map.put("data", user);
        return map;
    }

    /**
     * 更新用户
     * @param user
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author Wang926454
     * @date 2018/8/9 16:11
     */
    @PutMapping("/user")
    public Map<String,Object> update(@RequestBody User user){
        int count = userService.updateByPrimaryKeySelective(user);
        Map map = new HashMap(16);
        map.put("code", "200");
        map.put("count", count);
        map.put("data", user);
        return map;
    }

    /**
     * 删除用户
     * @param id
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author Wang926454
     * @date 2018/8/9 16:12
     */
    @DeleteMapping("/user/{id}")
    public Map<String,Object> delete(@PathVariable("id") Integer id){
        int count = userService.deleteByPrimaryKey(id);
        Map map = new HashMap(16);
        map.put("code", "200");
        map.put("count", count);
        map.put("data", null);
        return map;
    }
}