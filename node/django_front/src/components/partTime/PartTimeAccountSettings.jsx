import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link as routerLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalPhone from '@mui/icons-material/LocalPhone';
import axios from 'axios';

export default function PartTimeAccountSettings() {

    const [users, setUsers] = useState(null)

    useEffect(() => {
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${window.localStorage.getItem('access')}`,
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                })
        .catch(err=>{console.log(err);});
    }, []);


    const [selectedItem, setSelectedItem] = React.useState('')

    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

    if (!users) return null;
    return (
        <>
            <Fragment>
                <div>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("name")}>
                                    <ListItemIcon>
                                        <BadgeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="氏名" secondary={users.last_name + " " + users.first_name} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("phoneNumber")}>
                                    <ListItemIcon>
                                        <LocalPhone />
                                    </ListItemIcon>
                                    <ListItemText primary="電話番号" secondary={users.phone} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("email")}>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="メールアドレス" secondary={users.email} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton 
                                    component={routerLink}
                                    to="/partTimeChangePassword"
                                    >
                                    <ListItemIcon>
                                        <KeyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="パスワード" secondary="パスワード再設定画面に移動します" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </Fragment>

            <Dialog open={selectedItem === "name"} onClose={onCloseDialog}>
                <DialogTitle>氏名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する氏名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="姓"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="名"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "email"} onClose={onCloseDialog}>
                <DialogTitle>メールアドレス</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定するメールアドレスを入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="メールアドレス"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "phoneNumber"} onClose={onCloseDialog}>
                <DialogTitle>電話番号</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する電話番号を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="電話番号"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}